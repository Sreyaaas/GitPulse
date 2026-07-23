"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "Analyzing repositories...",
  "Understanding coding habits...",
  "Calculating language distribution...",
  "Finding standout projects...",
  "Generating Git Pulse..."
];

export default function LoadingSequence() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="w-64 h-px bg-white/10 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-white"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 8, ease: "linear" }}
        />
      </div>
      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="text-zinc-500 text-sm font-medium tracking-widest uppercase text-center"
          >
            {STEPS[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}