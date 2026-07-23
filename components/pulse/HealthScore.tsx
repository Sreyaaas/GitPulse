import GlassCard from "../shared/GlassCard";

export default function HealthScore({ score }: { score: number }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center py-12">
      <div className="relative mb-6">
         <span className="text-6xl font-display font-bold tracking-tighter text-white">
          {score}
        </span>
        <span className="text-zinc-600 text-sm absolute -bottom-2 -right-6 font-mono italic">/100</span>
      </div>
      <h4 className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold">Health Score</h4>
    </GlassCard>
  );
}