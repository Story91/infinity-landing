import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bloom | Infinity Tech',
  description: 'Bloom — kreatywne narzędzie AI od Infinity Tech.',
  openGraph: {
    title: 'Bloom | Infinity Tech',
    description: 'Bloom — kreatywne narzędzie AI od Infinity Tech.',
    type: 'website',
  },
};

export default function BloomLayout({ children }: { children: React.ReactNode }) {
  return children;
}
