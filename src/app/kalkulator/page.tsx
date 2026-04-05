'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, Calculator, TrendingUp, Clock, Shield } from 'lucide-react';
import KalkulatorWizard from '@/components/kalkulator/KalkulatorWizard';
import ClickSpark from '@/components/react-bits/ClickSpark';

const Background3D = dynamic(() => import('@/components/Background3D'), { ssr: false });
const StaggeredMenu = dynamic(() => import('@/components/StaggeredMenu'), { ssr: false });

const menuItems = [
  { label: 'Start', ariaLabel: 'Strona główna', link: '/' },
  { label: 'Usługi', ariaLabel: 'Zobacz nasze usługi', link: '/#uslugi' },
  { label: 'O nas', ariaLabel: 'Dowiedz się więcej o nas', link: '/#o-nas' },
  { label: 'Kalkulator ROI', ariaLabel: 'Oblicz ROI automatyzacji', link: '/kalkulator' },
  { label: 'Kontakt', ariaLabel: 'Skontaktuj się z nami', link: '/#kontakt' },
  { label: 'FAQ', ariaLabel: 'Częste pytania', link: '/#faq' },
];

const socialItems = [
  { label: 'X (Twitter)', link: 'https://x.com/InfinityTech_PL' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true' },
  { label: 'Email', link: 'mailto:contact@infinityteam.io' },
];

export default function KalkulatorPage() {
  return (
    <ClickSpark sparkColor="#7B9BDB" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
      <div className="min-h-screen text-white relative">
        {/* 3D Background */}
        <Background3D />

        {/* Navigation */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 50, pointerEvents: 'none' }}>
          <StaggeredMenu
            isFixed={true}
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen={true}
            colors={['#0B0F2E', '#1A2461', '#2E4AAD']}
            logoUrl="/logo.png"
            accentColor="#2E4AAD"
          />
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden print:hidden" style={{ zIndex: 1 }}>
          <div className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-16 text-center">
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
                style={{ backgroundColor: 'rgba(46,74,173,0.3)' }}
              >
                <Calculator className="w-6 h-6 text-[#7B9BDB]" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Kalkulator ROI{' '}
              <span style={{ color: '#7B9BDB' }}>Automatyzacji AI</span>
            </h1>

            <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-8">
              Sprawdź ile czasu i pieniędzy możesz zaoszczędzić automatyzując procesy w Twojej firmie.
              Obliczenia na podstawie rzeczywistych danych polskiego rynku pracy (marzec 2026).
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#7B9BDB]" />
                <span className="text-white/60 text-sm">
                  <strong className="text-white">240–300%</strong> typowy ROI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#7B9BDB]" />
                <span className="text-white/60 text-sm">
                  <strong className="text-white">3–6 mies.</strong> zwrot inwestycji
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#7B9BDB]" />
                <span className="text-white/60 text-sm">
                  <strong className="text-white">50%</strong> ulga podatkowa
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Wizard */}
        <section className="py-8 md:py-12 relative" style={{ zIndex: 1 }}>
          <KalkulatorWizard />
        </section>

        {/* Footer */}
        <footer className="text-center py-8 print:hidden relative" style={{ zIndex: 1, borderTop: '1px solid rgba(123,155,219,0.1)' }}>
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Infinity Tech. Dane: GUS, ZUS, Eurostat, badania branżowe PL 2026.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <Link href="/" className="text-sm text-[#7B9BDB] hover:text-white transition-colors">
              Strona główna
            </Link>
            <Link href="/#kontakt" className="text-sm text-[#7B9BDB] hover:text-white transition-colors">
              Kontakt
            </Link>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}
