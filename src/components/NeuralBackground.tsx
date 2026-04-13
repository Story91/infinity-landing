'use client';

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Ambient gradient glows */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#2E4AAD]/8 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-[#4F6AE8]/6 rounded-full blur-[60px] md:blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Animated flowing lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] opacity-[0.07]"
          style={{
            width: `${300 + Math.random() * 500}px`,
            top: `${10 + i * 12}%`,
            left: '-200px',
            background: `linear-gradient(90deg, transparent, ${i % 2 === 0 ? '#4F6AE8' : '#7B9BDB'}, transparent)`,
            animation: `flowLine ${12 + i * 3}s linear infinite`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}

      {/* Diagonal flowing lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={`d-${i}`}
          className="absolute w-[1px] opacity-[0.05]"
          style={{
            height: `${200 + Math.random() * 400}px`,
            left: `${15 + i * 18}%`,
            top: '-200px',
            background: `linear-gradient(180deg, transparent, ${i % 2 === 0 ? '#2E4AAD' : '#4F6AE8'}, transparent)`,
            animation: `flowDown ${15 + i * 4}s linear infinite`,
            animationDelay: `${i * 2}s`,
            transform: `rotate(${15 + i * 5}deg)`,
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(#7B9BDB 1px, transparent 1px),
            linear-gradient(90deg, #7B9BDB 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <style jsx>{`
        @keyframes flowLine {
          0% { transform: translateX(-200px); opacity: 0; }
          10% { opacity: 0.07; }
          90% { opacity: 0.07; }
          100% { transform: translateX(calc(100vw + 200px)); opacity: 0; }
        }
        @keyframes flowDown {
          0% { transform: translateY(-200px) rotate(var(--rotate, 15deg)); opacity: 0; }
          10% { opacity: 0.05; }
          90% { opacity: 0.05; }
          100% { transform: translateY(calc(100vh + 200px)) rotate(var(--rotate, 15deg)); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
