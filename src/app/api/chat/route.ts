import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/api-utils';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!rateLimit(ip, 15, 60_000)) {
      return NextResponse.json({ error: 'Zbyt wiele zapytań. Spróbuj ponownie za chwilę.' }, { status: 429 });
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length > 1000) {
      return NextResponse.json(
        { error: 'Wiadomość jest wymagana (max 1000 znaków)' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const fallbackResponses = [
        'Dziękuję za wiadomość! Aby uzyskać więcej informacji o naszych usługach AI, proszę o kontakt mailowy: contact@infinityteam.io',
        'Chętnie opowiem więcej o naszych rozwiązaniach AI. Zapraszamy do kontaktu telefonicznego lub mailowego!',
        'Nasze rozwiązania AI pomagają firmom automatyzować procesy i oszczędzać czas. Więcej szczegółów na naszej stronie!',
        'Świetnie, że się zainteresowałeś! Umów bezpłatną konsultację, a przedstawimy Ci dopasowane rozwiązanie.'
      ];

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      return NextResponse.json({ response: randomResponse });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Jesteś asystentem AI firmy Infinity Tech - polskiej firmy specjalizującej się w rozwiązaniach AI dla biznesu.

Firma oferuje:
- Automatyzację procesów biznesowych za pomocą AI
- AI Agentów do obsługi HR, marketingu i sprzedaży
- Integrację z OpenCLAW (otwarty framework AI)
- Consulting w zakresie transformacji cyfrowej

Kluczowe informacje:
- Email: contact@infinityteam.io
- Lokalizacja: Zamość, woj. lubelskie, Polska
- Język: Polski (odpowiadaj po polsku)
- Ton: profesjonalny, ale przyjazny

Odpowiadaj krótko i zwięźle (max 2-3 zdania).`
          },
          {
            role: 'user',
            content: message.trim()
          }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API error');
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || 'Przepraszam, nie udało mi się odpowiedzieć.';

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas przetwarzania wiadomości' },
      { status: 500 }
    );
  }
}
