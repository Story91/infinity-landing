import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenci AI | Infinity Tech',
  description: 'Poznaj naszych agentów AI — automatyzacja HR, marketingu i sprzedaży. Inteligentne rozwiązania dopasowane do Twojego biznesu.',
  openGraph: {
    title: 'Agenci AI | Infinity Tech',
    description: 'Poznaj naszych agentów AI — automatyzacja HR, marketingu i sprzedaży.',
    type: 'website',
  },
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
