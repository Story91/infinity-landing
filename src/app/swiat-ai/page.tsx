import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import dynamic from 'next/dynamic';
import AiNewsPage from '@/components/AiNewsPage';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

export const revalidate = 7200;

export const metadata: Metadata = {
  title: 'Świat AI | Infinity Tech',
  description: 'Najnowsze wiadomości ze świata sztucznej inteligencji. Automatyczny feed z HackerNews, Dev.to, The Guardian i Arxiv.',
  openGraph: {
    title: 'Świat AI | Infinity Tech',
    description: 'Najnowsze wiadomości ze świata AI — automatycznie, po polsku.',
    type: 'website',
  },
};

export default function SwiatAiPage() {
  return (
    <div className="min-h-screen bg-[#0B0F2E] relative">
      {/* Animated Floating Lines Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[4, 5, 3]}
          lineDistance={[4, 5, 6]}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          parallaxStrength={0.15}
          animationSpeed={0.8}
          linesGradient={['#1A2461', '#2E4AAD', '#4F6AE8', '#7B9BDB', '#2E4AAD']}
          mixBlendMode="screen"
        />
      </div>

      {/* Navigation — static, stays in hero only */}
      <nav className="relative z-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image src="/logo.png" alt="Infinity Tech" width={32} height={32} className="object-contain brightness-0 invert md:w-[42px] md:h-[42px]" />
            <span className="text-lg md:text-2xl font-bold text-white">INFINITY TECH</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[#7B9BDB] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Powrót</span>
          </Link>
        </div>
      </nav>

      {/* AI News Content */}
      <div className="relative z-10">
        <AiNewsPage />
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-10 md:py-16 border-t border-[#1A2461]/30 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
            <div>
              <div className="text-xl md:text-2xl font-bold text-[#D6E4FF] mb-3 md:mb-4">Infinity Tech</div>
              <p className="text-[#7B9BDB] text-sm mb-4 md:mb-6">Tworzymy przyszłość biznesu z AI.</p>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-[#1A2461] border border-[#2E4AAD]/40 flex items-center justify-center hover:border-[#4F6AE8] hover:bg-[#2E4AAD]/20 transition-all">
                    <Icon className="w-5 h-5 text-[#7B9BDB]" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Na skróty</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><Link href="/" className="hover:text-white transition-colors">Start</Link></li>
                <li><Link href="/swiat-ai" className="hover:text-white transition-colors">Świat AI</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Usługi</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li><a href="#" className="hover:text-white transition-colors">AI Agenci</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Automatyzacja</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Kontakt</h4>
              <ul className="space-y-2 text-[#7B9BDB]">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@infinityteam.io</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +48 123 456 789</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Warszawa, Polska</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#1A2461] pt-8 text-center text-[#7B9BDB]">
            <p>&copy; {new Date().getFullYear()} Infinity Tech.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
