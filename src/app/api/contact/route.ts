import { NextResponse } from 'next/server';
import { escapeHtml, rateLimit } from '@/lib/api-utils';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

async function sendEmail(apiKey: string, payload: object): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[contact] Resend error', res.status, detail);
    return { ok: false, error: detail };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!rateLimit(ip, 5, 60_000)) {
      return NextResponse.json({ error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.' }, { status: 429 });
    }

    const { name, email, phone, message } = await request.json();

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'Nieprawidłowy adres email' }, { status: 400 });
    }
    if (typeof message !== 'string' || message.trim().length < 3) {
      return NextResponse.json({ error: 'Wiadomość jest za krótka' }, { status: 400 });
    }

    const cleanEmail = email.trim();
    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';
    const cleanMessage = message.trim();

    const safeEmail = escapeHtml(cleanEmail);
    const safeName = escapeHtml(cleanName);
    const safePhone = escapeHtml(cleanPhone);
    const safeMessage = escapeHtml(cleanMessage);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.WAITLIST_TO || 'contact@infinityteam.io';
    const from = process.env.WAITLIST_FROM || 'Infinity Tech <waitlist@infinityteam.io>';

    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY missing');
      return NextResponse.json({ ok: true, delivered: false });
    }

    const notificationHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; padding: 16px;">
        <h2 style="margin: 0 0 12px; color: #0A1628;">Nowa wiadomość z formularza kontaktowego</h2>
        ${safeName ? `<p style="margin: 0 0 8px; color: #334155;"><strong>Imię i nazwisko:</strong> ${safeName}</p>` : ''}
        <p style="margin: 0 0 8px; color: #334155;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        ${safePhone ? `<p style="margin: 0 0 8px; color: #334155;"><strong>Telefon:</strong> ${safePhone}</p>` : ''}
        <p style="margin: 0 0 8px; color: #334155;"><strong>Wiadomość:</strong></p>
        <p style="margin: 0 0 16px; color: #334155; white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 8px;">${safeMessage}</p>
        <p style="margin: 16px 0 0; color: #64748b; font-size: 12px;">Zgłoszenie wysłane z landing page infinityteam.io</p>
      </div>
    `;

    const confirmationHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 520px; margin: 0 auto; background: #0A1628; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2E4AAD, #4F6AE8); padding: 28px 32px 24px; display: flex; align-items: center; gap: 16px;">
          <img src="https://infinityteam.io/infinity-logo.png" alt="Infinity Tech" width="48" height="48" style="display: block; border-radius: 10px; flex-shrink: 0;" />
          <div>
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">Infinity Tech</h1>
            <p style="margin: 4px 0 0; color: rgba(255,255,255,0.7); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;">Potwierdzenie wiadomości</p>
          </div>
        </div>
        <div style="padding: 32px;">
          <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 20px;">Dziękujemy za wiadomość${safeName ? ', ' + escapeHtml(cleanName.split(' ')[0]) : ''}!</h2>
          <p style="margin: 0 0 16px; color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6;">
            Otrzymaliśmy Twoją wiadomość i odezwiemy się najszybciej jak to możliwe — zazwyczaj w ciągu 24 godzin roboczych.
          </p>
          <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0 0 6px; color: rgba(255,255,255,0.4); font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Twoja wiadomość</p>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; margin-top: 8px;">
            <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 12px;">
              Infinity Tech · <a href="https://infinityteam.io" style="color: #7B9BDB; text-decoration: none;">infinityteam.io</a> · <a href="mailto:contact@infinityteam.io" style="color: #7B9BDB; text-decoration: none;">contact@infinityteam.io</a>
            </p>
          </div>
        </div>
      </div>
    `;

    const [notification, confirmation] = await Promise.all([
      sendEmail(apiKey, {
        from,
        to: [to],
        reply_to: cleanEmail,
        subject: `Nowa wiadomość od ${cleanName || cleanEmail}`,
        html: notificationHtml,
      }),
      sendEmail(apiKey, {
        from,
        to: [cleanEmail],
        subject: 'Dziękujemy za wiadomość — Infinity Tech',
        html: confirmationHtml,
      }),
    ]);

    if (!notification.ok) {
      return NextResponse.json({ error: 'Nie udało się wysłać wiadomości' }, { status: 502 });
    }

    if (!confirmation.ok) {
      console.warn('[contact] confirmation email failed');
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[contact] unexpected error', err);
    return NextResponse.json({ error: 'Wystąpił błąd serwera' }, { status: 500 });
  }
}
