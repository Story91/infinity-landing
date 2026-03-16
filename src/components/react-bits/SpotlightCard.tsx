'use client';

import { useRef } from 'react';

interface SpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(236, 107, 45, 0.15)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current!.style.setProperty('--mouse-x', `${x}px`);
    divRef.current!.style.setProperty('--mouse-y', `${y}px`);
    divRef.current!.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
      <style jsx>{`
        .card-spotlight {
          position: relative;
          border-radius: 1rem;
          border: 1px solid rgba(119, 120, 112, 0.2);
          background-color: #ffffff;
          padding: 1.5rem;
          overflow: hidden;
          height: 100%;
          --mouse-x: 50%;
          --mouse-y: 50%;
          --spotlight-color: rgba(236, 107, 45, 0.15);
        }
        .card-spotlight::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .card-spotlight:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
