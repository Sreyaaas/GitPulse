import { Terminal } from "lucide-react";
import GlassCard from "../shared/GlassCard";

export default function Persona({ archetype }: { archetype: string }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center py-12">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
        <Terminal size={20} className="text-zinc-400" />
      </div>
      <h4 className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mb-3 font-bold">Archetype</h4>
      <p className="text-3xl font-display font-bold text-white tracking-tight italic">
        {archetype}
      </p>
    </GlassCard>
  );
}