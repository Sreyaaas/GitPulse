"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Navbar from '../layout/Navbar';

interface ErrorStateProps {
  username: string;
}

export default function ErrorState({ username }: ErrorStateProps) {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <Navbar />
      
      {/* Decorative Blur for Error */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10"
      >
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Search size={24} className="text-zinc-500" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tighter text-white">
          Pulse Not Detected
        </h2>
        
        <p className="text-zinc-500 text-lg font-light italic mb-12 max-w-sm mx-auto leading-relaxed">
          The developer profile for <span className="text-zinc-300">@{username}</span> does not exist or is currently private.
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-white text-black px-10 py-4 rounded-full font-bold text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Return to Launchpad
        </Link>
      </motion.div>

      <footer className="fixed bottom-12 text-[10px] uppercase tracking-[0.4em] text-zinc-700 font-medium">
        Error Code: 404_USER_NOT_FOUND
      </footer>
    </main>
  );
}