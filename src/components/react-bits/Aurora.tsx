'use client';

import { useEffect, useRef } from 'react';

interface AuroraProps {
  className?: string;
  colorStops?: string[];
  speed?: number;
  blend?: number;
  amplitude?: number;
}

export default function Aurora({
  className = '',
  colorStops = ['#3A29FF', '#FF94B4', '#FF3232'],
  speed = 1,
  blend = 0.5,
  amplitude = 1,
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.01 * speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      const offset1 = Math.sin(time) * 0.2 + 0.2;
      const offset2 = Math.sin(time * 1.5) * 0.2 + 0.5;
      const offset3 = Math.sin(time * 0.7) * 0.2 + 0.8;
      
      gradient.addColorStop(Math.max(0, offset1 - 0.1), colorStops[0]);
      gradient.addColorStop(offset1, colorStops[0] + '00');
      gradient.addColorStop(Math.max(0, offset2 - 0.1), colorStops[1]);
      gradient.addColorStop(offset2, colorStops[1] + '00');
      gradient.addColorStop(Math.max(0, offset3 - 0.1), colorStops[2]);
      gradient.addColorStop(offset3, colorStops[2] + '00');
      
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = blend;
      
      for (let i = 0; i < 3; i++) {
        const waveY = canvas.height * 0.5 + 
          Math.sin(time + i * 2) * 50 * amplitude +
          Math.sin(time * 1.5 + i) * 30 * amplitude;
        
        const waveGradient = ctx.createLinearGradient(
          0, waveY - 200 * amplitude,
          0, waveY + 200 * amplitude
        );
        
        waveGradient.addColorStop(0, 'transparent');
        waveGradient.addColorStop(0.5, colorStops[i] + '40');
        waveGradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, waveY - 200 * amplitude, canvas.width, 400 * amplitude);
      }
      
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [colorStops, speed, blend, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      className={`aurora absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
