import { GitHubRepo } from "@/types/github";

export function calculateLanguages(repos: GitHubRepo[]) {
  const counts: Record<string, number> = {};
  let total = 0;

  repos.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      total++;
    }
  });

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5); // Top 5
}