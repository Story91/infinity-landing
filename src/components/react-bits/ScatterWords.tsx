'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScatterWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function ScatterWords({
  text,
  className = '',
  delay = 30,
}: ScatterWordsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const words = text.split(' ');

  return (
    <span className={cn('inline-flex flex-wrap gap-1', className)}>
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className={cn(
            'inline-block opacity-0',
            isVisible && 'animate-scatter'
          )}
          style={{
            animationDelay: `${wordIndex * delay}ms`,
            animationDuration: '0.5s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {word}
        </span>
      ))}
      <style jsx>{`
        @keyframes scatter {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-scatter {
          animation-name: scatter;
        }
      `}</style>
    </span>
  );
}
