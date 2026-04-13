'use client';

import { useState } from 'react';
import { Linkedin, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStep, setNewsletterStep] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || !newsletterConsent) return;
    setNewsletterStep('submitting');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Newsletter' }),
      });
      if (!res.ok) throw new Error();
      setNewsletterStep('done');
    } catch {
      setNewsletterStep('error');
    }
  };

  return (
    <footer className="py-16 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">Infinity Tech</div>
            <p className="text-[#7B9BDB] mb-6">
              Tworzymy przyszłość biznesu z AI. Automatyzujemy, optymalizujemy, transformujemy.
            </p>
            <div className="flex gap-3">
              <a href="https://x.com/InfinityTech_PL" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@infinityteam.io" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Na skróty</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#7B9BDB]">
              <a href="/#start" className="hover:text-white transition-colors text-sm">Start</a>
              <a href="/swiat-ai" className="hover:text-white transition-colors text-sm">Świat AI</a>
              <a href="/#o-nas" className="hover:text-white transition-colors text-sm">O nas</a>
              {/* <a href="/case-studies" className="hover:text-white transition-colors text-sm">Case Studies</a> */}
              <a href="/#uslugi" className="hover:text-white transition-colors text-sm">Co robimy</a>
              <a href="/kalkulator" className="hover:text-white transition-colors text-sm">Kalkulator ROI</a>
              <a href="/#faq" className="hover:text-white transition-colors text-sm">FAQ</a>
              <a href="/#kontakt" className="hover:text-white transition-colors text-sm">Kontakt</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-[#7B9BDB] mb-4">Zapisz się, aby otrzymywać najnowsze informacje o AI.</p>
            {newsletterStep === 'done' ? (
              <div className="flex items-center gap-2 text-sm text-[#7B9BDB]">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Dziękujemy! Odezwiemy się.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter}>
                <div className="flex">
                  <input
                    type="email"
                    required
                    disabled={newsletterStep === 'submitting'}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Twój email"
                    className="flex-1 px-4 py-3 rounded-l-lg bg-white/5 border border-white/10 text-white outline-none focus:border-[#2E4AAD] disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStep === 'submitting' || !newsletterConsent}
                    className="px-4 py-3 bg-[#2E4AAD] rounded-r-lg hover:bg-[#1A2461] transition-colors disabled:opacity-60"
                  >
                    {newsletterStep === 'submitting' ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin block" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <label className="flex items-start gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    className="mt-0.5 accent-[#2E4AAD] shrink-0"
                  />
                  <span className="text-[10px] leading-tight text-[#7B9BDB]">
                    Wyrażam zgodę na otrzymywanie informacji handlowych drogą elektroniczną
                    od Infinity Tech. Zapoznałem/am się z{' '}
                    <a href="/polityka-prywatnosci" className="underline hover:text-white">Polityką Prywatności</a>.
                  </span>
                </label>
                {newsletterStep === 'error' && (
                  <p className="mt-1 text-xs text-red-400">Spróbuj ponownie.</p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#7B9BDB] text-sm">&copy; 2026 Infinity Tech. Wszelkie prawa zastrzeżone.</p>
          <div className="flex gap-6 text-sm text-[#7B9BDB]">
            <a href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</a>
            <a href="/regulamin" className="hover:text-white transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
