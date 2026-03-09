'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface TiltedCardProps {
  image?: string;
  title: string;
  description?: string;
  price?: string;
  features?: string[];
  className?: string;
  accentColor?: string;
}

export default function TiltedCard({
  image,
  title,
  description,
  price,
  features,
  className = '',
  accentColor = '#6366f1',
}: TiltedCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -10;
    const rotateY = (mouseX / (rect.width / 2)) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn('perspective-1000', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-white shadow-xl transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 50%, ${accentColor}10 100%)`,
          }}
        />

        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="p-6">
          {price && (
            <div className="mb-3">
              <span className="text-3xl font-bold" style={{ color: accentColor }}>
                {price}
              </span>
              <span className="text-sm text-slate-500">/miesiąc</span>
            </div>
          )}
          
          <h3 className="mb-2 text-xl font-bold text-slate-900">{title}</h3>
          
          {description && (
            <p className="mb-4 text-slate-600">{description}</p>
          )}

          {features && features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-slate-700">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
