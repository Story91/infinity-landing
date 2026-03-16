import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  metadataBase: new URL('https://infinityteam.io'),
  title: "Infinity Tech | AI Solutions for Business",
  description: "Transformujemy Twoją firmę dzięki inteligentnym rozwiązaniom AI. Automatyzacja, optymalizacja i innowacje dla małych, średnich i dużych przedsiębiorstw.",
  keywords: ["AI", "sztuczna inteligencja", "automatyzacja", "biznes", "Poland", "HR", "marketing", "sprzedaż"],
  authors: [{ name: "Infinity Tech" }],
  creator: "Infinity Tech",
  publisher: "Infinity Tech",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://infinityteam.io",
    siteName: "Infinity Tech",
    title: "Infinity Tech | AI Solutions for Business",
    description: "Transformujemy Twoją firmę dzięki inteligentnym rozwiązaniom AI. Automatyzacja, optymalizacja i innowacje dla małych, średnich i dużych przedsiębiorstw.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Infinity Tech - AI dla Twojego Biznesu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Tech | AI Solutions for Business",
    description: "Transformujemy Twoją firmę dzięki inteligentnym rozwiązaniom AI.",
    images: ["/logo.jpg"],
    creator: "@InfinityTech_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" style={{ '--font-geist': GeistSans.style.fontFamily, '--font-inter': inter.style.fontFamily, '--font-jakarta': plusJakarta.style.fontFamily } as React.CSSProperties}>
      <body className={`antialiased ${inter.variable} ${plusJakarta.variable}`}>{children}</body>
    </html>
  );
}
