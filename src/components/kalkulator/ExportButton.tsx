'use client';

import { Printer } from 'lucide-react';

export default function ExportButton() {
  const handleExport = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
      style={{
        backgroundColor: '#0D0F05',
        color: '#fff',
      }}
    >
      <Printer className="w-4 h-4" />
      Pobierz raport PDF
    </button>
  );
}
