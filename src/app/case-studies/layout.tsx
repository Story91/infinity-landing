import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Infinity Tech',
  description: 'Sprawdź, jak nasze rozwiązania AI pomagają firmom automatyzować procesy i zwiększać efektywność.',
  openGraph: {
    title: 'Case Studies | Infinity Tech',
    description: 'Sprawdź, jak nasze rozwiązania AI pomagają firmom.',
    type: 'website',
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
