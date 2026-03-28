'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Calculator, TrendingUp, Clock, Shield } from 'lucide-react';
import KalkulatorWizard from '@/components/kalkulator/KalkulatorWizard';
import ClickSpark from '@/components/react-bits/ClickSpark';

const StaggeredMenu = dynamic(() => import('@/components/StaggeredMenu'), { ssr: false });

const menuItems = [
  { label: 'Start', ariaLabel: 'Strona główna', link: '/' },
  { label: 'Agenci AI', ariaLabel: 'Zobacz naszych agentów AI', link: '/agents' },
  { label: 'Case Studies', ariaLabel: 'Zobacz case studies', link: '/case-studies' },
  { label: 'Blog', ariaLabel: 'Przeczytaj bloga', link: '/blog' },
  { label: 'Kontakt', ariaLabel: 'Skontaktuj się z nami', link: '/#kontakt' },
];

const socialItems = [
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
];

export default function KalkulatorPage() {
  return (
    <ClickSpark sparkColor="#2E4AAD" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
      <div className="min-h-screen" style={{ backgroundColor: '#EDF2FF' }}>
        {/* Navigation */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, pointerEvents: 'none' }}>
          <StaggeredMenu
            isFixed={true}
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#0B0F2E"
            openMenuButtonColor="#ffffff"
          />
        </div>

        {/* Hero sekcja */}
        <section
          className="relative overflow-hidden print:hidden"
          style={{
            background: 'linear-gradient(135deg, #0B0F2E 0%, #1a1a2e 50%, #0B0F2E 100%)',
            minHeight: '420px',
          }}
        >
          {/* Dekoracyjne elementy */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(circle, #2E4AAD, transparent)',
                top: '-10%',
                right: '10%',
              }}
            />
            <div
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-10"
              style={{
                background: 'radial-gradient(circle, #7B9BDB, transparent)',
                bottom: '-5%',
                left: '15%',
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót na stronę główną
            </Link>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(46,74,173,0.2)' }}
              >
                <Calculator className="w-6 h-6" style={{ color: '#2E4AAD' }} />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Kalkulator ROI{' '}
              <span style={{ color: '#2E4AAD' }}>Automatyzacji AI</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Sprawdź ile czasu i pieniędzy możesz zaoszczędzić automatyzując procesy w Twojej firmie.
              Obliczenia na podstawie rzeczywistych danych polskiego rynku pracy (marzec 2026).
            </p>

            {/* Statystyki */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: '#2E4AAD' }} />
                <span className="text-white/80 text-sm">
                  <strong className="text-white">240–300%</strong> typowy ROI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" style={{ color: '#2E4AAD' }} />
                <span className="text-white/80 text-sm">
                  <strong className="text-white">3–6 mies.</strong> zwrot inwestycji
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: '#2E4AAD' }} />
                <span className="text-white/80 text-sm">
                  <strong className="text-white">50%</strong> ulga podatkowa
                </span>
              </div>
            </div>
          </div>

          {/* Falka na dole */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 60L1440 60L1440 0C1440 0 1080 40 720 40C360 40 0 0 0 0L0 60Z" fill="#EDF2FF" />
            </svg>
          </div>
        </section>

        {/* Wizard */}
        <section className="py-8 md:py-12">
          <KalkulatorWizard />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 print:hidden" style={{ borderTop: '1px solid #D6E4FF' }}>
          <p className="text-sm" style={{ color: '#7B9BDB' }}>
            &copy; {new Date().getFullYear()} Infinity Tech. Dane: GUS, ZUS, Eurostat, badania branżowe PL 2026.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <Link href="/" className="text-sm hover:underline" style={{ color: '#2E4AAD' }}>
              Strona główna
            </Link>
            <Link href="/agents" className="text-sm hover:underline" style={{ color: '#2E4AAD' }}>
              Agenci AI
            </Link>
            <Link href="/#kontakt" className="text-sm hover:underline" style={{ color: '#2E4AAD' }}>
              Kontakt
            </Link>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
