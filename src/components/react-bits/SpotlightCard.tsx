'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SpotlightCardProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export default function SpotlightCard({
  children,
  className,
  title,
  description,
  icon: Icon,
}: SpotlightCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white shadow-lg',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: mousePosition.x ? 
          `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 50%)` :
          'white'
      }}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`,
          opacity: mousePosition.x ? 1 : 0,
        }}
      />
      
      {/* Content */}
      <div className="relative p-6">
        {Icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
        )}
        {title && (
          <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
        )}
        {description && (
          <p className="text-slate-600">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
