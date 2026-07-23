"use client";

import { motion } from "framer-motion";

interface Language {
  name: string;
  percentage: number;
}

export default function SkillDNA({ languages }: { languages: Language[] }) {
  return (
    <section className="w-full max-w-4xl mx-auto py-24 border-t border-white/5">
      <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-16 text-center">
        Skill DNA
      </h3>
      
      <div className="space-y-12">
        {languages.map((lang, index) => (
          <div key={lang.name} className="group">
            <div className="flex justify-between items-end mb-4">
              <span className="text-2xl font-display font-medium group-hover:translate-x-2 transition-transform duration-500">
                {lang.name}
              </span>
              <span className="text-zinc-600 font-mono text-sm tracking-tighter">
                {lang.percentage}%
              </span>
            </div>
            <div className="w-full h-px bg-white/5 relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 h-px bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}