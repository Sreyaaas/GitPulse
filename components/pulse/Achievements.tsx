import { Trophy, Zap } from "lucide-react";
import GlassCard from "../shared/GlassCard";

export default function Achievements({ achievements, rhythm }: { achievements: string[], rhythm: string }) {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {/* Trophies */}
      <GlassCard className="flex flex-col justify-between p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <Trophy size={20} className="text-yellow-400" />
          </div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-300 font-semibold">Trophy Cabinet</h4>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {achievements.map((badge) => (
            <span key={badge} className="px-3.5 py-2 bg-yellow-500/5 border border-yellow-500/15 rounded-xl text-sm font-medium text-yellow-200/90">
              🏆 {badge}
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Rhythms - Fixed typography and font scaling */}
      <GlassCard className="flex flex-col justify-between p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Zap size={20} className="text-blue-400" />
          </div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-zinc-300 font-semibold">Workflow Rhythm</h4>
        </div>
        <div>
          {/* Increased from tiny text-2xl to a prominent, bold text-3xl */}
          <p className="text-3xl font-display font-bold text-white tracking-tight mb-2">{rhythm}</p>
          {/* Increased from tiny text-xs to comfortable text-sm */}
          <p className="text-sm text-zinc-400 font-normal leading-relaxed">Inferred from repository update velocity and commit cadence.</p>
        </div>
      </GlassCard>
    </div>
  );
}