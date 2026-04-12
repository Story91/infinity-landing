import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';
import AiNewsPage from '@/components/AiNewsPage';

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
    <div className="min-h-screen bg-[#0B0F2E]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0F2E]/90 backdrop-blur-lg border-b border-[#1A2461]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Infinity Tech" width={42} height={42} className="object-contain brightness-0 invert" />
            <span className="text-xl md:text-2xl font-bold text-white">INFINITY TECH</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-[#7B9BDB] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Powrót</span>
          </Link>
        </div>
      </nav>

      {/* AI News Content */}
      <AiNewsPage />

      {/* Footer */}
      <footer className="py-16 bg-[#050B1F] border-t border-[#1A2461] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-[#D6E4FF] mb-4">Infinity Tech</div>
              <p className="text-[#7B9BDB] mb-6">Tworzymy przyszłość biznesu z AI.</p>
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
