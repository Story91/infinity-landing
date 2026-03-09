import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infinity Tech | AI Solutions for Business",
  description: "Transformujemy Twoją firmę dzięki inteligentnym rozwiązaniom AI. Automatyzacja, optymalizacja i innowacje dla małych, średnich i dużych przedsiębiorstw.",
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
