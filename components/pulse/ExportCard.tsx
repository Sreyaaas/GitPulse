"use client";

import { GitHubUser } from "@/types/github";
import GlassCard from "../shared/GlassCard";
import { Share2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ExportCard({ user, archetype, score }: { user: GitHubUser, archetype: string, score: number }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    // We now use the 'text' variable so TypeScript and ESLint are fully satisfied
    const text = `Check out ${user.name || user.login}'s GitPulse Profile! Archetype: ${archetype} | Health Score: ${score}/100 🚀 - ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="w-full max-w-4xl mx-auto mb-12 relative overflow-hidden group border-blue-500/20 bg-linear-to-r from-blue-950/20 via-zinc-900/40 to-purple-950/20">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Sparkles size={120} className="text-blue-400" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div>
          <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-mono tracking-widest text-blue-400 uppercase mb-3 inline-block">
            Shareable Developer Snapshot
          </span>
          <h4 className="text-2xl font-display font-bold text-white">Export & Showcase</h4>
          <p className="text-zinc-400 text-sm font-light mt-1">
            Copy your formatted GitPulse summary to share on LinkedIn or Twitter.
          </p>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-lg whitespace-nowrap cursor-pointer"
        >
          <Share2 size={16} />
          {copied ? "Snapshot Copied!" : "Copy Share Text"}
        </button>
      </div>
    </GlassCard>
  );
}