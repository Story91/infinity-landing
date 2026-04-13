'use client';

import Image from 'next/image';
import { Poppins, Source_Serif_4 } from 'next/font/google';
import {
  Sparkles,
  Download,
  Wand2,
  BookOpen,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
} from 'lucide-react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
});

export default function BloomPage() {
  return (
    <div
      className={`${poppins.variable} ${sourceSerif.variable} relative min-h-screen overflow-hidden font-display`}
    >
      {/* Video Background — z-0 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content — z-10 */}
      <div className="relative z-10 flex min-h-screen">
        {/* ───────── Left Panel (52%) ───────── */}
        <div className="w-full lg:w-[52%] relative min-h-screen">
          {/* Glass overlay */}
          <div className="absolute inset-4 lg:inset-6 rounded-3xl liquid-glass-strong" />

          {/* Panel content */}
          <div className="relative z-10 flex flex-col min-h-screen px-8 lg:px-12 py-8">
            {/* Nav */}
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Bloom" width={32} height={32} />
                <span className="text-white font-semibold text-2xl tracking-tighter">
                  bloom
                </span>
              </div>
              <button className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm hover:scale-105 transition-transform">
                Menu
                <Menu className="w-4 h-4" />
              </button>
            </nav>

            {/* Hero — centered */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 py-12">
              <Image src="/logo.png" alt="Bloom" width={80} height={80} />

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.05em] text-white leading-[1.1]">
                Innovating the
                <br />
                spirit of{' '}
                <em className="font-serif text-white/80 not-italic italic">
                  bloom
                </em>{' '}
                AI
              </h1>

              <button className="liquid-glass-strong rounded-full px-8 py-4 flex items-center gap-3 text-white text-base font-medium hover:scale-105 active:scale-95 transition-transform">
                Explore Now
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </span>
              </button>

              <div className="flex flex-wrap justify-center gap-3">
                {['Artistic Gallery', 'AI Generation', '3D Structures'].map(
                  (pill) => (
                    <span
                      key={pill}
                      className="liquid-glass rounded-full px-5 py-2 text-xs text-white/80"
                    >
                      {pill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Bottom quote */}
            <div className="text-center space-y-3 pb-4">
              <p className="text-xs tracking-widest uppercase text-white/50">
                Visionary Design
              </p>
              <p className="text-white text-lg leading-relaxed">
                &ldquo;We imagined{' '}
                <span className="font-serif italic text-white/80">
                  a realm
                </span>{' '}
                with no ending.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-white/20" />
                <span className="text-xs tracking-widest uppercase text-white/50">
                  Marcus Aurelio
                </span>
                <div className="h-px w-12 bg-white/20" />
              </div>
            </div>
          </div>
        </div>

        {/* ───────── Right Panel (48%) — desktop only ───────── */}
        <div className="hidden lg:flex w-[48%] flex-col p-6 gap-6">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="liquid-glass rounded-full px-3 py-2 flex items-center gap-2">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/infinitytechgroup/?viewAsMember=true' },
                { Icon: Instagram, href: 'https://x.com/InfinityTech_PL' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </span>
                </a>
              ))}
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </div>
            <button className="liquid-glass rounded-full p-3 hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Community card */}
          <div className="liquid-glass rounded-3xl p-6 w-56">
            <h3 className="text-white font-medium text-sm mb-2">
              Enter our ecosystem
            </h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Join our community of creators and designers shaping the future of
              floral AI.
            </p>
          </div>

          {/* Bottom feature section */}
          <div className="mt-auto liquid-glass rounded-[2.5rem] p-4 space-y-4">
            {/* Two side-by-side cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="liquid-glass rounded-3xl p-6 hover:scale-105 transition-transform">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <Wand2 className="w-4 h-4 text-white" />
                </span>
                <h4 className="text-white font-medium text-sm">Processing</h4>
                <p className="text-white/50 text-xs mt-1">
                  Real-time AI rendering
                </p>
              </div>
              <div className="liquid-glass rounded-3xl p-6 hover:scale-105 transition-transform">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-4 h-4 text-white" />
                </span>
                <h4 className="text-white font-medium text-sm">
                  Growth Archive
                </h4>
                <p className="text-white/50 text-xs mt-1">
                  Botanical database
                </p>
              </div>
            </div>

            {/* Bottom card with thumbnail */}
            <div className="liquid-glass rounded-3xl p-5 flex items-center gap-4">
              {/* Flower thumbnail placeholder */}
              <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm">
                  Advanced Plant Sculpting
                </h4>
                <p className="text-white/50 text-xs mt-1">
                  AI-powered botanical design tools
                </p>
              </div>
              <button className="liquid-glass w-10 h-10 rounded-full flex items-center justify-center text-white text-lg hover:scale-105 transition-transform flex-shrink-0">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
