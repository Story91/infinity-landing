import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F2E] flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-6xl md:text-8xl font-bold text-[#2E4AAD] mb-4">404</h1>
      <p className="text-xl md:text-2xl mb-2">Strona nie została znaleziona</p>
      <p className="text-[#7B9BDB] mb-8 text-center">Strona, której szukasz, nie istnieje lub została przeniesiona.</p>
      <Link
        href="/"
        className="px-8 py-3 bg-[#2E4AAD] hover:bg-[#1A2461] rounded-full font-semibold transition-colors"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
