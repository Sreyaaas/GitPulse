"use client";

import { GitHubEvent } from "@/types/github";
import GlassCard from "../shared/GlassCard";
import { GitCommit, GitPullRequest, CircleDot, Activity } from "lucide-react";

export default function RecentActivity({ events }: { events: GitHubEvent[] }) {
  if (!events || events.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto mb-12">
      <div className="flex items-center gap-2 mb-4">
        <Activity size={18} className="text-blue-400" />
        <h3 className="text-xl font-bold text-white tracking-tight">
          Public Activity Pulse
        </h3>
      </div>

      <GlassCard className="p-6">
        <div className="space-y-4">
          {events.map((event) => {
            const timeAgo = formatTimeAgo(new Date(event.created_at));
            const repoName = event.repo.name;

            if (event.type === "PushEvent") {
              const commitCount = event.payload?.commits?.length || 1;
              const firstMessage = event.payload?.commits?.[0]?.message || "Pushed code commits";

              return (
                <div key={event.id} className="flex items-start gap-3 text-xs border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                    <GitCommit size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-zinc-200">
                        Pushed {commitCount} {commitCount === 1 ? "commit" : "commits"} to{" "}
                        <span className="text-blue-400 font-mono">{repoName}</span>
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">{timeAgo}</span>
                    </div>
                    <p className="text-zinc-400 truncate mt-0.5 font-mono text-[11px]">
                      &ldquo;{firstMessage.split("\n")[0]}&rdquo;
                    </p>
                  </div>
                </div>
              );
            }

            if (event.type === "PullRequestEvent") {
              const action = event.payload?.action || "opened";
              const title = event.payload?.pull_request?.title || "Pull Request";

              return (
                <div key={event.id} className="flex items-start gap-3 text-xs border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                    <GitPullRequest size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-zinc-200">
                        {action.charAt(0).toUpperCase() + action.slice(1)} PR in{" "}
                        <span className="text-purple-400 font-mono">{repoName}</span>
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">{timeAgo}</span>
                    </div>
                    <p className="text-zinc-400 truncate mt-0.5">
                      {title}
                    </p>
                  </div>
                </div>
              );
            }

            return (
              <div key={event.id} className="flex items-start gap-3 text-xs border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-400 shrink-0 mt-0.5">
                  <CircleDot size={14} />
                </div>
                <div className="min-w-0 flex-1 flex items-center justify-between gap-2">
                  <span className="text-zinc-300">
                    Activity on <span className="font-mono text-zinc-400">{repoName}</span>
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">{timeAgo}</span>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 3600) return `${Math.max(1, Math.floor(seconds / 60))}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  const days = Math.floor(seconds / 86400);
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}
