"use client";

import { ReactNode, useState } from "react";

export default function GlassCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden bg-zinc-950/75 border border-white/10 hover:border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 group ${className}`}
    >
      {/* 1. Actual Technical Mesh / Dot Pattern Inside the Card */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[20px_20px] opacity-25 pointer-events-none z-0" />

      {/* 2. Interactive Spotlight Glow (Follows cursor inside & highlights border) */}
      {isHovered && (
        <div 
          className="absolute pointer-events-none -inset-px rounded-2xl sm:rounded-3xl transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.22), rgba(59, 130, 246, 0.18), transparent 70%)`
          }}
        />
      )}

      {/* 3. Card Content (Pushed above the mesh and glow layers) */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}