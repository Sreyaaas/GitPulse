"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Check, Copy, X } from "lucide-react";

export default function PulseNavbar({ githubUrl, username }: { githubUrl: string, username: string }) {
  const [searchInput, setSearchInput] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/pulse/${searchInput.trim().toLowerCase()}`);
    setSearchInput("");
    setMobileSearchOpen(false);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] sm:w-auto max-w-3xl">
      <nav className="apple-glass rounded-full px-3 sm:px-5 py-2 flex items-center justify-between gap-2.5 sm:gap-5 transition-all duration-300">
        
        {mobileSearchOpen ? (
          /* Mobile Search Bar Expansion */
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <Search size={14} className="text-zinc-400 shrink-0" />
            <input 
              type="text" 
              autoFocus
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search developer..."
              autoCapitalize="none"
              autoCorrect="off"
              className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 outline-hidden py-1"
            />
            <button
              type="button"
              onClick={() => setMobileSearchOpen(false)}
              className="p-1 rounded-full text-zinc-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </form>
        ) : (
          <>
            {/* Left: Back + Breadcrumb */}
            <div className="flex items-center gap-2 shrink-0 min-w-0">
              <Link 
                href="/" 
                title="Back to Launchpad"
                className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs font-medium group shrink-0"
              >
                <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <ArrowLeft size={11} className="text-zinc-400 group-hover:text-white" />
                </div>
                <span className="hidden sm:inline font-semibold">GitPulse</span>
              </Link>
              <span className="text-zinc-600 text-xs hidden sm:inline">/</span>
              <span className="text-xs font-mono font-medium text-white truncate max-w-[90px] xs:max-w-[120px] sm:max-w-[160px]">
                @{username}
              </span>
            </div>

            {/* Center: Desktop Quick-Switcher */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative flex items-center">
                <Search size={12} className="absolute left-2.5 text-zinc-500 pointer-events-none" />
                <input 
                  type="text" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Jump to @dev..." 
                  autoCapitalize="none"
                  autoCorrect="off"
                  className="w-36 lg:w-44 bg-white/[0.04] hover:bg-white/[0.08] focus:bg-zinc-950 focus:w-48 border border-white/10 focus:border-white/30 rounded-full pl-7 pr-7 py-1 text-[11px] text-white placeholder:text-zinc-500 outline-hidden transition-all"
                />
                <span className="absolute right-2 px-1 rounded text-[9px] font-mono text-zinc-500 bg-white/5 select-none">
                  ↵
                </span>
              </div>
            </form>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                title="Search developer"
                className="md:hidden flex items-center justify-center w-7 h-7 rounded-full text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10"
              >
                <Search size={12} />
              </button>

              <button
                onClick={handleCopyLink}
                title="Copy profile link"
                className="flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.1] px-2.5 py-1 rounded-full border border-white/10 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span className="text-[11px] hidden xs:inline">Share</span>
                  </>
                )}
              </button>

              <a 
                href={githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 bg-white text-black hover:bg-zinc-200 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
              >
                <span>GitHub</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </>
        )}

      </nav>
    </header>
  );
}