"use client";

import React from "react";

export default function GeminiBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* 1. Deep space base backdrop */}
      <div className="absolute inset-0 bg-[#090a0f]" />

      {/* 2. Single, elegant, soft ambient light cone from top center (Linear / Vercel style) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.08) 50%, transparent 80%)",
        }}
      />

      {/* 3. Subtle crisp technical grid */}
      <div 
        className="absolute inset-0 opacity-[0.16]" 
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* 4. Soft Vignette that ensures all content and text has razor-sharp contrast */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 50% 40%, transparent 40%, rgba(9, 10, 15, 0.75) 85%, #090a0f 100%)",
        }}
      />
    </div>
  );
}