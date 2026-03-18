import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, "Navn er påkrævet").max(100),
  email: z.string().email("Ugyldig email"),
  company: z.string().max(100).optional(),
  message: z.string().min(10, "Beskeden skal være mindst 10 tegn").max(2000),
  consent: z.literal(true),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limit map for Vercel
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Rate limiting based on IP
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const limitRecord = rateLimit.get(ip);
  if (limitRecord) {
    if (now - limitRecord.timestamp < WINDOW_MS) {
      if (limitRecord.count >= MAX_REQUESTS) {
        return res.status(429).json({ error: 'For mange forsøg. Prøv igen om lidt.' });
      }
      limitRecord.count++;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  try {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const { name, email, company, message } = result.data;
    const companyText = company ? company : 'Ingen angivet';

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'website@clickncontent.dk',
      to: 'kontakt@clickncontent.dk',
      subject: `Ny henvendelse fra ${name} — ${companyText}`,
      replyTo: email, // Set visitor email directly as replying to
      text: `Navn: ${name}\nEmail: ${email}\nVirksomhed: ${companyText}\nBesked: ${message}`,
      html: `
        <h3>Ny henvendelse via hjemmesiden</h3>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Virksomhed:</strong> ${companyText}</p>
        <br/>
        <p><strong>Besked:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (data.error) {
      console.error("Resend delivery err:", data.error);
      return res.status(500).json({ error: 'Kunne ikke sende emailen. Prøv igen eller ring til os.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Endpoint error:", error);
    return res.status(500).json({ error: 'Der opstod en serverfejl. Prøv igen eller ring til os.' });
  }
}
