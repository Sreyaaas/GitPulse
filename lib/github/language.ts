import { GitHubRepo } from "@/types/github";

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Java: "#b07219",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Ruby: "#701516",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Shell: "#89e051",
  Solidity: "#AA6746",
};

export function calculateLanguages(repos: GitHubRepo[]) {
  // Filter for authored repos first to reflect authentic engineering
  const authoredRepos = repos.filter(r => !r.fork);
  const targetRepos = authoredRepos.length > 0 ? authoredRepos : repos;

  const counts: Record<string, number> = {};
  let total = 0;

  targetRepos.forEach(repo => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
      total++;
    }
  });

  if (total === 0) return [];

  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.max(1, Math.round((count / total) * 100)),
      color: LANGUAGE_COLORS[name] || "#60a5fa",
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 6);
}