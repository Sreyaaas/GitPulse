import GlassCard from "../shared/GlassCard";
import { ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

export default function QualityAuditor({ maintenanceIndex, totalRepos }: { maintenanceIndex: number, totalRepos: number }) {
  const getGrade = (score: number) => {
    if (score >= 85) return { grade: "A+", label: "Elite Standard", color: "text-emerald-400" };
    if (score >= 70) return { grade: "A", label: "Production Ready", color: "text-blue-400" };
    if (score >= 50) return { grade: "B", label: "Active Experimenter", color: "text-yellow-400" };
    return { grade: "C", label: "Needs Polish", color: "text-orange-400" };
  };

  const rating = getGrade(maintenanceIndex);

  return (
    <GlassCard className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-widest font-bold mb-2">
            <ShieldCheck size={16} className="text-emerald-400" /> Repository Quality & Maintenance Index
          </div>
          <h4 className="text-2xl font-display font-bold text-white tracking-tight">
            Codebase Health Grade: <span className={rating.color}>{rating.grade}</span>
          </h4>
          <p className="text-zinc-500 text-sm font-light mt-1">
            Based on active maintenance cycles across {totalRepos} public codebases.
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Active Index</p>
            <p className="text-2xl font-mono font-bold text-white">{maintenanceIndex}%</p>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">Status</p>
            <p className="text-s font-bold text-zinc-300">{rating.label}</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}