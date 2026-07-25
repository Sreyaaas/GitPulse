"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-full sm:max-w-5xl px-4 sm:px-8">
      <div className="flex items-center justify-between px-5 sm:px-8 py-3 bg-zinc-950/75 border border-white/10 rounded-full backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-3 group cursor-default">
          <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-md">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-black" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </div>
          <span className="font-display font-bold tracking-tight text-sm uppercase text-white">GitPulse</span>
        </div>
        
        {/* Desktop & Mobile actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            System Operational
          </div>
          
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs uppercase tracking-wider font-bold text-zinc-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            GitHub ↗
          </a>
        </div>

      </div>
    </header>
  );
}