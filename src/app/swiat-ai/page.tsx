import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';
import AiNewsPage from '@/components/AiNewsPage';
import { getNewsWithCache } from '@/lib/newsCache';

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { ssr: false });

export const revalidate = 7200; // ISR: rebuild every 2h in background

export const metadata: Metadata = {
  title: 'Świat AI | Infinity Tech',
  description: 'Najnowsze wiadomości ze świata sztucznej inteligencji. Automatyczny feed z HackerNews, Dev.to, The Guardian i Arxiv.',
  openGraph: {
    title: 'Świat AI | Infinity Tech',
    description: 'Najnowsze wiadomości ze świata AI — automatycznie, po polsku.',
    type: 'website',
  },
};

export default async function SwiatAiPage() {
  const news = await getNewsWithCache();

  return (
    <div className="min-h-screen bg-[#0B0F2E] relative">
      {/* Animated Floating Lines Background — hidden on mobile */}
      <div className="fixed inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
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

      {/* Navigation */}
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

      {/* AI News Content — pre-rendered with data */}
      <div className="relative z-10">
        <AiNewsPage initialNews={news} />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
