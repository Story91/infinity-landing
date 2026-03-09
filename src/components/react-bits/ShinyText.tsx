'use client';

import { cn } from '@/lib/utils';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ShinyText({ text, className = '', speed = 5 }: ShinyTextProps) {
  return (
    <span
      className={cn(
        'relative inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent',
        className
      )}
      style={{
        backgroundSize: '200% auto',
        animation: `shiny ${speed}s linear infinite`,
      }}
    >
      {text}
      <style jsx>{`
        @keyframes shiny {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </span>
  );
}
