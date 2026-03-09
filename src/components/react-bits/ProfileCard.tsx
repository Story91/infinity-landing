'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  className?: string;
}

export default function ProfileCard({
  name,
  role,
  bio,
  image,
  linkedin,
  className = '',
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white shadow-lg',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Social link */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-indigo-600 group-hover:opacity-100"
          >
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-1 text-xl font-bold text-slate-900">{name}</h3>
        <p className="mb-3 text-sm font-medium text-indigo-600">{role}</p>
        
        {/* Bio - shows on hover */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <p className="text-sm text-slate-600">{bio}</p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="h-1 w-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300"
        style={{
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </div>
  );
}
