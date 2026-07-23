"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";

// Dummy subscribe function (hydration state won't change after mounting)
const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Snapshot for Client
    () => false  // Snapshot for Server
  );
}

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useIsMounted();

  // Skeleton placeholder matching exact dimensions to avoid layout shift during SSR
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all pointer-events-auto overflow-hidden group"
    >
      <motion.div
        initial={false}
        animate={{ y: isDark ? 0 : 40, opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ y: !isDark ? 0 : -40, opacity: !isDark ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun size={18} className="text-amber-500 group-hover:text-amber-400 transition-colors" />
      </motion.div>
    </button>
  );
}