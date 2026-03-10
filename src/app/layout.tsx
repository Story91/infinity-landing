import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://infinity-team.io'),
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
    url: "https://infinity-team.io",
    siteName: "Infinity Tech",
    title: "Infinity Tech | AI Solutions for Business",
    description: "Transformujemy Twoją firmę dzięki inteligentnym rozwiązaniom AI. Automatyzacja, optymalizacja i innowacje dla małych, średnich i dużych przedsiębiorstw.",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
    creator: "@InfinityTech_PL",
  },
  facebook: {
    appId: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
