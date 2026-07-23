"use client";

import { GitHubUser } from "@/types/github";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Building2, Users, FolderRoot } from "lucide-react";

export default function ProfileHeader({ user }: { user: GitHubUser }) {
  return (
    <div className="w-full pt-20 pb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative w-40 h-40 mb-12 group">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition-all duration-1000" />
          <Image 
            src={user.avatar_url} 
            alt={user.login} 
            fill 
            className="rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-4">
          {user.name || user.login}
        </h1>
        <p className="text-zinc-500 text-xl font-light max-w-2xl leading-relaxed mb-12">
          {user.bio}
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-zinc-400">
          {user.location && (
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-zinc-600" />
              {user.location}
            </div>
          )}
          {user.company && (
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-zinc-600" />
              {user.company}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Users size={14} className="text-zinc-600" />
            {user.followers.toLocaleString()} Followers
          </div>
          <div className="flex items-center gap-2">
            <FolderRoot size={14} className="text-zinc-600" />
            {user.public_repos} Projects
          </div>
        </div>
      </motion.div>
    </div>
  );
}