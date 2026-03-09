'use client';

import { useRef, useState } from 'react';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export default function GlowBorder({
  children,
  className = '',
  color = '#6366f1',
}: GlowBorderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: mousePosition.x ? 
          `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}20, transparent 70%)` :
          'transparent',
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          padding: '1px',
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}, transparent 70%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: mousePosition.x ? 1 : 0.3,
          transition: 'opacity 0.3s',
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
