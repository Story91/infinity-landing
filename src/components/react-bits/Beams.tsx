'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BeamsProps {
  className?: string;
  color?: string;
  speed?: number;
  density?: number;
}

export default function Beams({
  className = '',
  color = '#6366f1',
  speed = 5,
  density = 15,
}: BeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const beams: HTMLDivElement[] = [];
    
    for (let i = 0; i < density; i++) {
      const beam = document.createElement('div');
      beam.className = 'beam';
      beam.style.cssText = `
        position: absolute;
        width: 100px;
        height: 200%;
        background: linear-gradient(to bottom, transparent, ${color}, transparent);
        opacity: ${0.1 + Math.random() * 0.15};
        transform: rotate(${Math.random() * 30 - 15}deg);
        left: ${Math.random() * 100}%;
        top: -50%;
        filter: blur ${20 + Math.random() * 30}px;
        animation: beamMove ${speed + Math.random() * 3}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      container.appendChild(beam);
      beams.push(beam);
    }

    return () => {
      beams.forEach(beam => beam.remove());
    };
  }, [color, speed, density]);

  return (
    <div
      ref={containerRef}
      className={`beams-container absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
