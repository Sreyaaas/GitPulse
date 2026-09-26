"use client";

import { motion } from "framer-motion";
import GlassCard from "../shared/GlassCard";
import { Code2, Layers, Scale } from "lucide-react";

interface LanguageItem {
  name: string;
  percentage: number;
  color?: string;
}

export default function SkillDNA({ 
  languages, 
  techStack,
  licenses = []
}: { 
  languages: LanguageItem[];
  techStack: string[];
  licenses?: string[];
}) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Language DNA */}
      <GlassCard className="p-6">
        <div className="flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <Code2 size={16} className="text-blue-400" />
          <span>Language Distribution</span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden flex mb-6 p-0.5">
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              initial={{ width: 0 }}
              whileInView={{ width: `${lang.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: lang.color || "#60a5fa" }}
              className="h-full first:rounded-l-full last:rounded-r-full"
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Breakdown List */}
        <div className="space-y-3">
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: lang.color || "#60a5fa" }}
                />
                <span className="font-medium text-zinc-200">{lang.name}</span>
              </div>
              <span className="font-mono text-zinc-400">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 2. Detected Tooling & Licenses */}
      <div className="space-y-6">
        {/* Tooling Tags */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Layers size={16} className="text-purple-400" />
            <span>Detected Tooling & Ecosystem</span>
          </div>

          {techStack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-zinc-300 hover:border-white/20 transition-colors"
                >
                  #{tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500">
              No specific repository tags detected.
            </p>
          )}
        </GlassCard>

        {/* Open Source Licenses */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Scale size={16} className="text-emerald-400" />
            <span>Open Source Licensing</span>
          </div>

          {licenses.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {licenses.map((lic) => (
                <span 
                  key={lic} 
                  className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-medium text-emerald-300"
                >
                  {lic}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-500">
              No standard open source licenses declared in recent repositories.
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}