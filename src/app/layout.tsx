import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://infinityteam.io'),
  title: "Infinity Tech | AI Solutions for Business",
  description: "Transformujemy Twoją firmę dzięki inteligentnym rozwiązaniom AI. Automatyzacja, optymalizacja i innowacje dla małych, średnich i dużych przedsiębiorstw.",
  keywords: ["AI", "sztuczna inteligencja", "automatyzacja", "biznes", "Poland", "HR", "marketing", "sprzedaż"],
  authors: [{ name: "Infinity Tech" }],
  creator: "Infinity Tech",
  publisher: "Infinity Tech",
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
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
        url: "https://infinityteam.io/og.png",
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
    images: ["https://infinityteam.io/og.png"],
    creator: "@InfinityTech_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" style={{ '--font-geist': GeistSans.style.fontFamily, '--font-inter': inter.style.fontFamily, '--font-jakarta': plusJakarta.style.fontFamily, '--font-jetbrains': jetbrainsMono.style.fontFamily } as React.CSSProperties}>
      <head>
        <meta name="theme-color" content="#050B1F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`antialiased ${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
