"use client";

import { DeveloperInsights } from "@/types/github";
import GlassCard from "../shared/GlassCard";
import { Star, GitFork, Activity, HardDrive } from "lucide-react";

export default function SignalsMatrix({ insights }: { insights: DeveloperInsights }) {
  const authoredRatio = insights.authoredReposCount + insights.forkedReposCount > 0
    ? Math.round((insights.authoredReposCount / (insights.authoredReposCount + insights.forkedReposCount)) * 100)
    : 100;

  return (
    <div className="w-full max-w-5xl mx-auto mb-6 sm:mb-8">
      {/* 2x2 Grid on Mobile, 4 Columns on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {/* Card 1: Authentic Stars */}
        <GlassCard className="p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Stars
            </span>
            <div className="p-1 rounded-md bg-yellow-500/10 text-yellow-400">
              <Star size={13} className="sm:w-[15px] sm:h-[15px]" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold font-mono text-white mb-0.5">
              {insights.authenticStars.toLocaleString()}
            </div>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 truncate">
              Authored repos only
            </p>
          </div>
        </GlassCard>

        {/* Card 2: Creation Ratio */}
        <GlassCard className="p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Originals
            </span>
            <div className="p-1 rounded-md bg-blue-500/10 text-blue-400">
              <GitFork size={13} className="sm:w-[15px] sm:h-[15px]" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold font-mono text-white mb-0.5">
              {authoredRatio}%
            </div>
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-zinc-400">
              <span className="text-emerald-400 font-medium">{insights.authoredReposCount} orig</span>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-zinc-500">{insights.forkedReposCount} fork</span>
            </div>
          </div>
        </GlassCard>

        {/* Card 3: Momentum & Cadence */}
        <GlassCard className="p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Momentum
            </span>
            <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400">
              <Activity size={13} className="sm:w-[15px] sm:h-[15px]" />
            </div>
          </div>
          <div>
            <div className="text-base sm:text-xl font-bold text-white mb-0.5 truncate">
              {insights.lastActiveDaysAgo === null
                ? "Dormant"
                : insights.lastActiveDaysAgo === 0
                ? "Today"
                : insights.lastActiveDaysAgo === 1
                ? "Yesterday"
                : `${insights.lastActiveDaysAgo}d ago`}
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-400 font-medium truncate">
              {insights.rhythm}
            </p>
          </div>
        </GlassCard>

        {/* Card 4: Codebase Footprint */}
        <GlassCard className="p-3.5 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Footprint
            </span>
            <div className="p-1 rounded-md bg-purple-500/10 text-purple-400">
              <HardDrive size={13} className="sm:w-[15px] sm:h-[15px]" />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-3xl font-bold font-mono text-white mb-0.5">
              {insights.codebaseSizeMB} <span className="text-xs font-normal text-zinc-400">MB</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 truncate">
              Across public repos
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Archetype & Core Stack Brief */}
      <div className="mt-2.5 sm:mt-3.5 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-medium text-[10px] sm:text-[11px]">
            ARCHETYPE
          </span>
          <span className="font-semibold text-white text-xs sm:text-sm">
            {insights.archetype}
          </span>
          {insights.primaryLanguages.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-zinc-600 hidden sm:inline">&bull;</span>
              <span className="text-zinc-400 text-[10px] sm:text-[11px]">Primary:</span>
              <span className="text-zinc-300 font-mono text-[10px] sm:text-[11px]">
                {insights.primaryLanguages.join(", ")}
              </span>
            </div>
          )}
        </div>
        <p className="text-zinc-400 text-[11px] sm:text-xs sm:text-right max-w-md leading-relaxed">
          {insights.archetypeDescription}
        </p>
      </div>
    </div>
  );
}
