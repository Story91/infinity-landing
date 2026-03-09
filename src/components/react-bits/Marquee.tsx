'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  speed?: number;
  pauseOnHover?: boolean;
}

export default function Marquee({
  children,
  className = '',
  direction = 'left',
  speed = 30,
  pauseOnHover = true,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn('overflow-hidden', className)}
    >
      <div
        className={cn(
          'flex whitespace-nowrap',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${direction === 'left' ? '' : 'reverse'} ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
