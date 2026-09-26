"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-auto">
      <nav className="apple-glass rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between sm:justify-start gap-6 sm:gap-8 transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-200">
            <svg 
              className="w-3.5 h-3.5 text-white" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="font-semibold tracking-tight text-sm text-white group-hover:text-zinc-200 transition-colors">
            GitPulse
          </span>
        </Link>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/Sreyaaas/GitPulse" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white transition-all bg-white/[0.06] hover:bg-white/[0.12] px-3.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 shadow-xs cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

      </nav>
    </header>
  );
}