"use client";

import { GitHubUser, DeveloperInsights } from "@/types/github";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Building2, Users, FolderGit2, Globe, Calendar, CheckCircle2 } from "lucide-react";

export default function ProfileHeader({ 
  user, 
  insights 
}: { 
  user: GitHubUser;
  insights: DeveloperInsights;
}) {
  return (
    <div className="w-full pt-2 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        {/* Avatar with Clean Border */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-4 group">
          <div className="relative w-full h-full rounded-full p-1 bg-zinc-900 border border-white/20 shadow-md overflow-hidden">
            <Image 
              src={user.avatar_url} 
              alt={user.login} 
              fill 
              sizes="112px"
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          {/* Active status indicator dot */}
          {insights.isActiveCoder && (
            <span 
              title="Active contributor in the last 45 days"
              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-zinc-950 rounded-full shadow-xs" 
            />
          )}
        </div>

        {/* Name and Handle */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            {user.name || user.login}
          </h1>
          {user.hireable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle2 size={11} /> Available for Hire
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs sm:text-sm mb-3">
          <span className="text-blue-400 font-medium">@{user.login}</span>
          <span className="text-zinc-600">&bull;</span>
          <span className="flex items-center gap-1 text-zinc-400 text-xs">
            <Calendar size={12} className="text-zinc-500" /> {insights.tenureYears}y on GitHub
          </span>
          {insights.followerRatio >= 2 && (
            <>
              <span className="text-zinc-600">&bull;</span>
              <span className="text-purple-400 text-xs font-mono">{insights.followerRatio}x Ratio</span>
            </>
          )}
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-zinc-300 text-xs sm:text-sm font-normal max-w-lg leading-relaxed mb-4 px-2">
            {user.bio}
          </p>
        )}

        {/* Verified Metadata Row */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-zinc-400">
          {user.company && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10">
              <Building2 size={12} className="text-zinc-500" />
              <span>{user.company}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10">
              <MapPin size={12} className="text-zinc-500" />
              <span>{user.location}</span>
            </div>
          )}
          {user.blog && (
            <a 
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Globe size={12} />
              <span>Website ↗</span>
            </a>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10">
            <Users size={12} className="text-zinc-500" />
            <span>{user.followers.toLocaleString()} Followers</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10">
            <FolderGit2 size={12} className="text-zinc-500" />
            <span>{user.public_repos} Repos</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}