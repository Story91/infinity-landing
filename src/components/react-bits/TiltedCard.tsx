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
  featured?: boolean;
}

export default function TiltedCard({
  image,
  title,
  description,
  price,
  features,
  className = '',
  accentColor = '#6366f1',
  featured = false,
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
      className={cn(
        'perspective-1000 h-full',
        featured && 'md:-mt-4 md:mb-4',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-white shadow-xl transition-transform duration-300 ease-out h-full flex flex-col',
          featured && 'md:shadow-2xl'
        )}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          borderColor: featured ? accentColor : 'transparent',
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 50%, ${accentColor}10 100%)`,
          }}
        />

        {/* Featured badge */}
        {featured && (
          <div 
            className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: accentColor }}
          >
            Popularny
          </div>
        )}

        {image && (
          <div className="relative h-40 w-full overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="p-5 flex-1 flex flex-col">
          {price && (
            <div className="mb-3">
              <span 
                className="text-3xl font-bold"
                style={{ color: accentColor }}
              >
                {price}
              </span>
              <span className="text-sm text-slate-500">/miesiąc</span>
            </div>
          )}
          
          <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
          
          {description && (
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">{description}</p>
          )}

          <div className="flex-1">
            {features && features.length > 0 && (
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
                    <div
                      className="h-1.5 w-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span className="line-clamp-2">{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Spacer for consistent button position */}
          <div className="mt-4" />
        </div>
      </div>
    </div>
  );
}
