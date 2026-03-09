'use client';

import { useEffect, useRef } from 'react';

interface DitherProps {
  className?: string;
  color1?: string;
  color2?: string;
  opacity?: number;
}

export default function Dither({
  className = '',
  color1 = '#000000',
  color2 = '#ffffff',
  opacity = 0.05,
}: DitherProps) {
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
      time += 0.02;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      
      if (c1 && c2) {
        for (let y = 0; y < canvas.height; y += 4) {
          for (let x = 0; x < canvas.width; x += 4) {
            const noise = Math.random();
            const threshold = (Math.sin(x * 0.05 + time) + Math.cos(y * 0.05 + time)) * 0.5 + 0.5;
            
            if (noise > threshold) {
              const index = (y * canvas.width + x) * 4;
              data[index] = c1.r;
              data[index + 1] = c1.g;
              data[index + 2] = c1.b;
              data[index + 3] = 255 * opacity;
            }
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
      }
      
      animationId = requestAnimationFrame(draw);
    };

    function hexToRgb(hex: string) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null;
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [color1, color2, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`dither absolute inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  );
}
