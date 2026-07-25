"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PulseNavbar({ githubUrl, username }: { githubUrl: string, username: string }) {
  return (
    <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-full sm:max-w-5xl px-4 sm:px-8">
      <div className="flex items-center justify-between px-5 sm:px-8 py-3 bg-zinc-950/75 border border-white/10 rounded-full backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
        
        <Link href="/" className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer">
          <ArrowLeft size={16} /> 
          <span>Launchpad</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Analyzing <span className="text-blue-400 font-bold">@{username}</span>
          </span>
          
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-all shadow-md"
          >
            View on GitHub ↗
          </a>
        </div>

      </div>
    </header>
  );
}