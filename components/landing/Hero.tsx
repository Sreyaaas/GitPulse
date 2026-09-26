"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center space-y-2.5 sm:space-y-3 mb-6 sm:mb-10 max-w-2xl mx-auto px-2">
      {/* Main Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight select-none"
      >
        <span className="heading-gradient">
          GitPulse
        </span>
      </motion.h1>
      
      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="text-base sm:text-xl md:text-2xl text-zinc-300 font-medium tracking-tight"
      >
        Know any developer in seconds.
      </motion.p>
    </div>
  );
}