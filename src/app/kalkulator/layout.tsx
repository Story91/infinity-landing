import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kalkulator ROI | Infinity Tech',
  description: 'Oblicz zwrot z inwestycji w automatyzację AI. Sprawdź, ile Twoja firma może zaoszczędzić z rozwiązaniami Infinity Tech.',
  openGraph: {
    title: 'Kalkulator ROI | Infinity Tech',
    description: 'Oblicz zwrot z inwestycji w automatyzację AI.',
    type: 'website',
  },
};

export default function KalkulatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
