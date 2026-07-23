"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 h-20 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-3 pointer-events-auto group cursor-default">
        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center transition-all duration-700 group-hover:rotate-360 group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </div>
        <span className="font-display font-bold tracking-tighter text-sm uppercase text-white">GitPulse</span>
      </div>
      
      <div className="flex items-center gap-6 pointer-events-auto">
        {/* Bold, high-contrast operational tag */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/30 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          System Operational
        </div>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-300 hover:text-white transition-colors">
          GitHub
        </a>
      </div>
    </nav>
  );
}