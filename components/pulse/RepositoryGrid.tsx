import { GitHubRepo } from "@/types/github";
import RepositoryCard from "./RepositoryCard";

export default function RepositoryGrid({ repos }: { repos: GitHubRepo[] }) {
  return (
    <section className="w-full py-24 border-t border-white/5">
      <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold mb-16 text-center">
        Featured Projects
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, index) => (
          <RepositoryCard key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </section>
  );
}