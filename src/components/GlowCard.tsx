import React, { useEffect, useRef, useState } from 'react';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(52, 211, 153, 0.15)" or "rgba(255, 255, 255, 0.12)"
  borderGlowColor?: string;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(255, 255, 255, 0.08)',
  borderGlowColor = 'rgba(255, 255, 255, 0.35)'
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        // subtle smooth hardware rendering
        transform: 'translateZ(0)'
      }}
    >
      {/* Dynamic Cursor Spotlight Beam on Background */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`
        }}
      />

      {/* Dynamic Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, ${borderGlowColor}, transparent 70%)`
        }}
      />

      {/* Actual Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
