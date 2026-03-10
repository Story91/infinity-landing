import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Infinity Tech - AI dla Twojego Biznesu';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            padding: '40px 60px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <span
            style={{
              fontSize: '60px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '10px',
            }}
          >
            INFINITY TECH
          </span>
          <span
            style={{
              fontSize: '28px',
              color: '#374151',
              marginBottom: '20px',
            }}
          >
            AI dla Twojego Biznesu
          </span>
          <span
            style={{
              fontSize: '18px',
              color: '#6b7280',
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            Automatyzacja • Optymalizacja • Innowacje
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
