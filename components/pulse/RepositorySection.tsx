"use client";

import { useState } from "react";
import { GitHubRepo } from "@/types/github";
import GlassCard from "../shared/GlassCard";
import { Star, GitFork, ExternalLink, Calendar, Scale, Terminal, Check } from "lucide-react";
import { LANGUAGE_COLORS } from "@/lib/github/language";

export default function RepositorySection({ repos }: { repos: GitHubRepo[] }) {
  const [filter, setFilter] = useState<"authored" | "forks" | "all">("authored");
  const [clonedId, setClonedId] = useState<number | null>(null);

  const authoredRepos = repos.filter(r => !r.fork);
  const forkedRepos = repos.filter(r => r.fork);

  const displayedRepos = filter === "authored" 
    ? (authoredRepos.length > 0 ? authoredRepos : repos)
    : filter === "forks" 
    ? forkedRepos 
    : repos;

  // Sort by stars descending, then pushed_at
  const sorted = [...displayedRepos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime();
    })
    .slice(0, 9);

  const copyCloneCmd = (e: React.MouseEvent, repo: GitHubRepo) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone ${repo.html_url}.git`);
    setClonedId(repo.id);
    setTimeout(() => setClonedId(null), 2000);
  };

  return (
    <section className="w-full max-w-5xl mx-auto mb-8 sm:mb-10">
      {/* Section Header with Responsive Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Flagship Repositories
          </h3>
          <p className="text-[11px] sm:text-xs text-zinc-400">
            Ranked by authentic impact and commit recency
          </p>
        </div>

        {/* Filter Pills with Horizontal Scroll on Mobile */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs overflow-x-auto no-scrollbar self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("authored")}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-all cursor-pointer ${
              filter === "authored" 
                ? "bg-white text-black shadow-xs" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Authored ({authoredRepos.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("forks")}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-all cursor-pointer ${
              filter === "forks" 
                ? "bg-white text-black shadow-xs" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Forks ({forkedRepos.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-2.5 sm:px-3 py-1 rounded-md font-medium text-xs whitespace-nowrap transition-all cursor-pointer ${
              filter === "all" 
                ? "bg-white text-black shadow-xs" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            All ({repos.length})
          </button>
        </div>
      </div>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-white/10 bg-white/[0.02] text-zinc-500 text-xs">
          No repositories found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          {sorted.map((repo) => {
            const pushDateFormatted = repo.pushed_at 
              ? new Date(repo.pushed_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
              : null;

            return (
              <a 
                key={repo.id} 
                href={repo.html_url} 
                target="_blank" 
                rel="noreferrer"
                className="block group h-full"
              >
                <GlassCard className="h-full p-4 sm:p-5 flex flex-col justify-between border-white/10 group-hover:border-white/25 transition-all duration-200">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate text-sm">
                          {repo.name}
                        </span>
                        {repo.fork && (
                          <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                            fork
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => copyCloneCmd(e, repo)}
                          title="Copy git clone command"
                          className="flex items-center justify-center w-7 h-7 rounded text-zinc-500 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          {clonedId === repo.id ? (
                            <Check size={13} className="text-emerald-400" />
                          ) : (
                            <Terminal size={13} />
                          )}
                        </button>
                        <span className="flex items-center justify-center w-6 h-6 text-zinc-500 group-hover:text-white transition-colors">
                          <ExternalLink size={13} />
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-2.5 sm:pt-3 border-t border-white/10 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-zinc-300">
                          <Star size={12} className="text-yellow-400" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1 text-zinc-300">
                          <GitFork size={12} className="text-blue-400" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>

                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || "#60a5fa" }} 
                          />
                          <span className="text-zinc-300 text-xs">{repo.language}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-500 pt-0.5">
                      {repo.license?.spdx_id ? (
                        <span className="flex items-center gap-1 text-emerald-400/80">
                          <Scale size={11} /> {repo.license.spdx_id}
                        </span>
                      ) : (
                        <span className="text-zinc-600">Unlicensed</span>
                      )}

                      {pushDateFormatted && (
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {pushDateFormatted}
                        </span>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
