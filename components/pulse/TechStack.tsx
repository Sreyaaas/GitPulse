import GlassCard from "../shared/GlassCard";

export default function TechStack({ stack }: { stack: string[] }) {
  if (!stack.length) return null;

  return (
    <GlassCard className="w-full max-w-4xl mx-auto mb-12">
      <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-6 text-center">
        Ecosystem & Tech Stack Radar
      </h3>
      <div className="flex flex-wrap justify-center gap-2.5">
        {stack.map((tech) => (
          <span 
            key={tech} 
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono tracking-wider text-zinc-300 uppercase hover:border-white/30 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}