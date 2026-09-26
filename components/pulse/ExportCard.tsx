"use client";

import { GitHubUser, DeveloperInsights } from "@/types/github";
import GlassCard from "../shared/GlassCard";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ExportCard({ 
  user, 
  insights,
  languages 
}: { 
  user: GitHubUser; 
  insights: DeveloperInsights;
  languages: { name: string; percentage: number }[];
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const topLangs = languages.slice(0, 3).map(l => `${l.name} (${l.percentage}%)`).join(", ");
    const text = [
      `✦ Developer Dossier: ${user.name || user.login} (@${user.login})`,
      `• Archetype: ${insights.archetype}`,
      `• Authentic Stars: ${insights.authenticStars.toLocaleString()} (${insights.authoredReposCount} original repos)`,
      `• Primary Stack: ${topLangs || "Polyglot"}`,
      `• Momentum: ${insights.rhythm} (Score: ${insights.healthScore}/100)`,
      `• Tenure: ${insights.tenureYears} Years on GitHub`,
      user.hireable ? `• Status: Available for Hire` : "",
      `• GitHub: ${user.html_url}`,
      `• GitPulse: ${typeof window !== "undefined" ? window.location.href : ""}`
    ].filter(Boolean).join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="w-full max-w-5xl mx-auto mb-16 p-6 sm:p-8 border-blue-500/20 bg-linear-to-r from-blue-950/20 via-zinc-900/40 to-purple-950/20">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] font-mono tracking-wider text-blue-400 uppercase mb-2 inline-block">
            Executive Summary Export
          </span>
          <h4 className="text-xl font-bold text-white">Share Candidate Dossier</h4>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Copy a structured briefing formatted for recruiting notes, Slack, or teammate reviews.
          </p>
        </div>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto justify-center flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-lg whitespace-nowrap cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check size={15} className="text-emerald-600" />
              <span>Dossier Copied!</span>
            </>
          ) : (
            <>
              <Copy size={15} />
              <span>Copy Dossier</span>
            </>
          )}
        </button>
      </div>
    </GlassCard>
  );
}