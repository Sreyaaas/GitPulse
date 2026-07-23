"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center space-y-4 mb-10">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white drop-shadow-md"
      >
        GitPulse
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-zinc-300 text-lg md:text-xl font-medium tracking-wide"
      >
        Know any developer in seconds.
      </motion.p>
    </div>
  );
}