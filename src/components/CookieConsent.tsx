'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#0B0F2E]/95 backdrop-blur-md border border-[#2E4AAD]/40 rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/40">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 text-sm text-white/80 leading-relaxed">
            <p>
              Ta strona korzysta z usług zewnętrznych (Google Maps), które mogą zapisywać
              pliki cookies na Twoim urządzeniu. Nie stosujemy własnych plików cookies ani
              narzędzi analitycznych. Szczegóły znajdziesz w naszej{' '}
              <Link href="/polityka-prywatnosci" className="text-[#7B9BDB] underline hover:text-white">
                Polityce Prywatności
              </Link>.
            </p>
          </div>
          <button
            onClick={accept}
            className="shrink-0 px-6 py-2.5 bg-[#2E4AAD] hover:bg-[#1A2461] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Rozumiem
          </button>
        </div>
      </div>
    </div>
  );
}
