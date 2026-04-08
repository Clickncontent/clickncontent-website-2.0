import { Client } from '@notionhq/client';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Navn er påkrævet').max(100),
  email: z.string().email('Ugyldig email'),
  phone: z.string().min(8, 'Telefonnummer er påkrævet').max(30),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Beskeden skal være mindst 10 tegn').max(2000),
  consent: z.literal(true),
});

// Simple in-memory rate limit (per Vercel function instance)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limiting ──────────────────────────────────────────
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

    const { name, email, phone, company, message } = result.data;
    const companyText = company || '—';

    // ── Notion: Create lead ────────────────────────────────────
    // Database: "Give away inbound leads" (ID: 33bb251bad1280c19c1ad01b96753fa1)
    // Columns: Virksomhed (title), Navn (rich_text), Email (email),
    //          Telefon nummer (phone_number), Besked (rich_text)
    if (process.env.NOTION_API_KEY) {
      try {
        const notion = new Client({ auth: process.env.NOTION_API_KEY });

        await notion.pages.create({
          parent: { database_id: '33bb251bad1280c19c1ad01b96753fa1' },
          properties: {
            // Title property = Virksomhed
            'Virksomhed':     { title: [{ text: { content: companyText } }] },
            'Navn':           { rich_text: [{ text: { content: name } }] },
            'Email':          { email },
            'Telefon nummer': { phone_number: phone },
            'Besked':         { rich_text: [{ text: { content: message } }] },
          },
        });

        console.log('✅ Notion lead created successfully');
      } catch (notionError: any) {
        // Non-blocking: log but allow the email to still go out
        console.error('Notion error:', notionError?.message || notionError);
      }
    } else {
      console.warn('NOTION_API_KEY not set — skipping Notion');
    }

    // ── Resend: Email notification ─────────────────────────────
    // Only runs if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'website@clickncontent.dk',
        to: 'kontakt@clickncontent.dk',
        subject: `Ny henvendelse fra ${name}${company ? ` · ${company}` : ''}`,
        replyTo: email,
        text: `Navn: ${name}\nEmail: ${email}\nTelefon: ${phone}\nVirksomhed: ${companyText}\nBesked: ${message}`,
        html: `
          <h3>Ny henvendelse via hjemmesiden</h3>
          <p><strong>Navn:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Virksomhed:</strong> ${companyText}</p>
          <br/>
          <p><strong>Besked:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });

      if (emailResult.error) {
        console.error('Resend delivery err:', emailResult.error);
        // Non-fatal — lead is already in Notion, don't fail the request
      }
    } else {
      console.warn('RESEND_API_KEY not set — skipping email notification');
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Endpoint error:', error);
    return res.status(500).json({ error: 'Der opstod en serverfejl. Prøv igen eller ring til os.' });
  }
}
