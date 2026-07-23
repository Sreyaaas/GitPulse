"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PulseNavbar({ githubUrl, username }: { githubUrl: string, username: string }) {
  return (
    <nav className="fixed top-0 w-full z-50 px-8 h-20 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-white/10">
      <Link href="/" className="flex items-center gap-2 text-zinc-200 hover:text-white transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer">
        <ArrowLeft size={16} /> Back to Launchpad
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Bold, legible analyzing status */}
        <span className="text-xs font-mono font-medium text-zinc-300 hidden sm:inline">
          Analyzing <span className="text-blue-400 font-bold">@{username}</span>
        </span>
        <a 
          href={githubUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-zinc-200 transition-all shadow-md"
        >
          View on GitHub ↗
        </a>
      </div>
    </nav>
  );
}