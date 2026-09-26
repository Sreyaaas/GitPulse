"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const STARTER_PROMPTS = [
  { name: "torvalds", role: "Linux / Git" },
  { name: "shadcn", role: "UI Design" },
  { name: "leerob", role: "Next.js" },
  { name: "antfu", role: "Vue / Vite" },
];

export default function SearchInput() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = (targetUser?: string) => {
    const userToFetch = (targetUser || username).trim();
    if (!userToFetch) return;
    
    setIsLoading(true);
    router.push(`/pulse/${userToFetch.toLowerCase()}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAnalyze();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-3.5 sm:space-y-4 px-2 sm:px-0">
      {/* Clean Search Input */}
      <motion.form 
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="relative flex items-center bg-zinc-950/80 border border-white/12 hover:border-white/25 focus-within:border-white/40 focus-within:ring-2 focus-within:ring-white/10 rounded-2xl p-1.5 sm:p-2 pl-3.5 sm:pl-4 pr-1.5 sm:pr-2 backdrop-blur-xl shadow-lg transition-all duration-200">
          
          <div className="shrink-0 flex items-center justify-center pr-2 text-zinc-500">
            <Search size={16} className="sm:w-[18px] sm:h-[18px]" />
          </div>

          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck="false"
            placeholder="GitHub username (e.g. shadcn)..."
            className="w-full bg-transparent px-1 py-2 sm:py-2.5 outline-hidden text-sm sm:text-base font-normal placeholder:text-zinc-500 text-white disabled:opacity-50"
          />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="hidden sm:inline-block px-2 py-1 rounded text-[10px] font-mono tracking-wider text-zinc-500 bg-white/5 border border-white/10 select-none">
              ↵
            </span>
            <button 
              type="submit"
              disabled={isLoading || !username.trim()}
              className="flex items-center gap-1 sm:gap-1.5 bg-white text-black hover:bg-zinc-200 px-3.5 sm:px-4 py-2 sm:py-2 rounded-xl font-semibold text-xs sm:text-sm min-h-[38px] sm:min-h-[40px] transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span className="hidden sm:inline">Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.form>

      {/* Clean Starter Chips */}
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-0.5"
      >
        <span className="text-[11px] sm:text-xs text-zinc-500 font-medium mr-0.5 select-none">
          Try:
        </span>
        {STARTER_PROMPTS.map((starter) => (
          <button
            key={starter.name}
            type="button"
            onClick={() => {
              setUsername(starter.name);
              handleAnalyze(starter.name);
            }}
            disabled={isLoading}
            className="group flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-[11px] sm:text-xs text-zinc-400 hover:text-white transition-all duration-150 cursor-pointer shadow-xs active:scale-95 min-h-[32px]"
          >
            <span className="text-zinc-200 font-medium">@{starter.name}</span>
            <span className="text-zinc-500 text-[10px] hidden xs:inline sm:inline">({starter.role})</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}