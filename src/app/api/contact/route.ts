import { Client } from '@notionhq/client';
import { Resend } from 'resend';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const schema = z.object({
  name: z.string().min(1, 'Navn er påkrævet').max(100),
  email: z.string().email('Ugyldig email'),
  phone: z.string().min(8, 'Telefonnummer er påkrævet').max(30),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Beskeden skal være mindst 10 tegn').max(2000),
  consent: z.literal(true),
});

// Simple in-memory rate limit
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  // ── Rate limiting ──────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const limitRecord = rateLimit.get(ip);
  if (limitRecord) {
    if (now - limitRecord.timestamp < WINDOW_MS) {
      if (limitRecord.count >= MAX_REQUESTS) {
        return NextResponse.json({ error: 'For mange forsøg. Prøv igen om lidt.' }, { status: 429 });
      }
      limitRecord.count++;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }
  } else {
    rateLimit.set(ip, { count: 1, timestamp: now });
  }

  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, phone, company, message } = result.data;
    const companyText = company || '—';

    if (!process.env.NOTION_API_KEY) {
      console.error("NOTION_API_KEY mangler i Environment Variables!");
      // We will still allow email sending if resend works, but let's be strict for debugging:
      // return NextResponse.json({ error: 'NOTION_API_KEY mangler i Vercel.' }, { status: 500 });
    }

    if (process.env.NOTION_API_KEY) {
      try {
        const notion = new Client({ auth: process.env.NOTION_API_KEY });
        await notion.pages.create({
          parent: { database_id: '33bb251bad1280c19c1ad01b96753fa1' },
          properties: {
            'Virksomhed':     { title: [{ text: { content: companyText } }] },
            'Navn':           { rich_text: [{ text: { content: name } }] },
            'Email':          { email },
            'Telefon nummer': { phone_number: phone },
            'Besked':         { rich_text: [{ text: { content: message } }] },
          },
        });
        console.log('✅ Notion lead created successfully');
      } catch (notionError: any) {
        console.error('Notion error:', notionError?.message || notionError);
        return NextResponse.json({ error: `Notion fejlede: ${notionError?.message}` }, { status: 500 });
      }
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const emailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'website@clickncontent.dk',
        to: 'kontakt@clickncontent.dk',
        subject: `Ny henvendelse fra ${name}${company ? ` · ${company}` : ''}`,
        replyTo: email,
        text: `Navn: ${name}\nEmail: ${email}\nTelefon: ${phone}\nVirksomhed: ${companyText}\nBesked: ${message}`,
        html: `<h3>Ny henvendelse</h3><p>${message}</p>`,
      });
      if (emailResult.error) console.error('Resend err:', emailResult.error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Endpoint error:', error);
    return NextResponse.json({ error: 'Der opstod en serverfejl.' }, { status: 500 });
  }
}
