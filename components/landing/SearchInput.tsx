"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchInput() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    // Explicit navigation push
    router.push(`/pulse/${username.trim().toLowerCase()}`);
  };

  return (
    <motion.form 
      onSubmit={handleAnalyze}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-2xl mx-auto w-full group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded-4xl blur-sm opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse pointer-events-none" />

      <div className="relative flex items-center bg-zinc-950/90 border border-white/20 rounded-4xl p-2 pr-4 backdrop-blur-3xl shadow-2xl">
        <div className="pl-6 text-zinc-300">
          <Sparkles size={20} className="text-fuchsia-400 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username (e.g. shadcn, torvalds)..."
          className="w-full bg-transparent px-4 py-4 outline-hidden text-lg md:text-xl font-medium placeholder:text-zinc-500 text-white"
        />
        <button 
          type="submit"
          className="flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-3xl font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 whitespace-nowrap cursor-pointer shadow-md"
        >
          Analyze <ArrowRight size={16} />
        </button>
      </div>
    </motion.form>
  );
}