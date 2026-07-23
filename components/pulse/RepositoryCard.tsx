"use client";

import { GitHubRepo } from "@/types/github";
import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import GlassCard from "../shared/GlassCard";

export default function RepositoryCard({ repo, index }: { repo: GitHubRepo, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Making the entire card point directly to the repo link */}
      <a href={repo.html_url} target="_blank" rel="noreferrer" className="block h-full group">
        <GlassCard className="h-full flex flex-col relative overflow-hidden p-6 border border-white/10 group-hover:border-blue-500/40 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-blue-500/10 transition-colors">
              <Code2 size={20} className="text-blue-400" />
            </div>
            <span className="text-zinc-500 group-hover:text-white transition-colors p-1">
              <ExternalLink size={18} />
            </span>
          </div>

          {/* Clear, bold, readable project title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {repo.name}
          </h3>
          
          {/* Thickened description text for absolute clarity */}
          <p className="text-zinc-300 text-sm font-normal leading-relaxed mb-6 grow">
            {repo.description || "No description provided for this repository."}
          </p>

          <div className="flex items-center gap-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
              <Star size={15} className="text-yellow-400" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
              <GitFork size={15} className="text-blue-400" />
              <span>{repo.forks_count}</span>
            </div>
            {repo.language && (
              <span className="text-xs font-mono font-medium text-zinc-300 ml-auto bg-white/10 px-2.5 py-1 rounded-md">
                {repo.language}
              </span>
            )}
          </div>
        </GlassCard>
      </a>
    </motion.div>
  );
}