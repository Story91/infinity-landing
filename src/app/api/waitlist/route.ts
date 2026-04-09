import { NextResponse } from 'next/server';

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
    console.error('[waitlist] Resend error', res.status, detail);
    return { ok: false, error: detail };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  try {
    const { email, source } = await request.json();

    if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json(
        { error: 'Nieprawidłowy adres email' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim();
    const signupSource = typeof source === 'string' && source ? source : 'Desktop App waitlist';

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.WAITLIST_TO || 'contact@infinityteam.io';
    const from = process.env.WAITLIST_FROM || 'Infinity Tech <waitlist@infinityteam.io>';

    console.log('[waitlist] apiKey present:', !!apiKey, '| from:', from, '| to:', to);

    if (!apiKey) {
      console.warn('[waitlist] RESEND_API_KEY missing — signup received but not sent:', cleanEmail, '/', signupSource);
      return NextResponse.json({ ok: true, delivered: false });
    }

    // 1. Powiadomienie dla nas
    const notificationHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; padding: 16px;">
        <h2 style="margin: 0 0 12px; color: #0A1628;">Nowy zapis na waitlist</h2>
        <p style="margin: 0 0 8px; color: #334155;"><strong>Źródło:</strong> ${signupSource}</p>
        <p style="margin: 0 0 8px; color: #334155;"><strong>Email:</strong> <a href="mailto:${cleanEmail}">${cleanEmail}</a></p>
        <p style="margin: 16px 0 0; color: #64748b; font-size: 12px;">Zgłoszenie wysłane z landing page infinityteam.io</p>
      </div>
    `;

    // 2. Potwierdzenie dla użytkownika
    const confirmationHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 520px; margin: 0 auto; background: #0A1628; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #2E4AAD, #4F6AE8); padding: 28px 32px 24px; display: flex; align-items: center; gap: 16px;">
          <img src="https://infinityteam.io/infinity-logo.png" alt="Infinity Tech" width="48" height="48" style="display: block; border-radius: 10px; flex-shrink: 0;" />
          <div>
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">Infinity Tech</h1>
            <p style="margin: 4px 0 0; color: rgba(255,255,255,0.7); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase;">Desktop App — Waitlist</p>
          </div>
        </div>
        <div style="padding: 32px;">
          <h2 style="margin: 0 0 12px; color: #ffffff; font-size: 20px;">Jesteś na liście!</h2>
          <p style="margin: 0 0 16px; color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6;">
            Dziękujemy za zainteresowanie naszą aplikacją Desktop AI. Pracujemy nad nią intensywnie — będziesz jedną z pierwszych osób, które dostaną dostęp.
          </p>
          <p style="margin: 0 0 24px; color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6;">
            Gdy aplikacja będzie gotowa, odezwiemy się bezpośrednio na ten adres email.
          </p>
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
        subject: `Nowy zapis na waitlist: ${signupSource}`,
        html: notificationHtml,
      }),
      sendEmail(apiKey, {
        from,
        to: [cleanEmail],
        subject: 'Jesteś na liście — Infinity Tech Desktop App',
        html: confirmationHtml,
      }),
    ]);

    if (!notification.ok) {
      return NextResponse.json(
        { error: 'Nie udało się wysłać zgłoszenia' },
        { status: 502 }
      );
    }

    // Potwierdzenie do użytkownika jest opcjonalne — nie blokujemy sukcesu jeśli nie doszło
    if (!confirmation.ok) {
      console.warn('[waitlist] confirmation email failed for', cleanEmail);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[waitlist] unexpected error', err);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}
