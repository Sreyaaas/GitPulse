import { GitHubRepo, GitHubUser, GitHubEvent, DeveloperInsights } from "@/types/github";

export function generateInsights(
  user: GitHubUser,
  repos: GitHubRepo[],
  events: GitHubEvent[] = []
): DeveloperInsights {
  // 1. Separate Authored Repos from Forks
  const authoredRepos = repos.filter(r => !r.fork);
  const forkedRepos = repos.filter(r => r.fork);
  
  // 2. Authentic Stars (Strictly from original authored repos)
  const authenticStars = authoredRepos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
  const authoredCount = authoredRepos.length;
  const forkedCount = forkedRepos.length;

  // 3. Account Tenure
  const createdDate = new Date(user.created_at);
  const tenureYears = Math.max(1, Math.floor((Date.now() - createdDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)));

  // 4. Momentum & Recency (Based on pushed_at)
  let lastActiveDaysAgo: number | null = null;
  const pushDates = repos
    .map(r => r.pushed_at ? new Date(r.pushed_at).getTime() : 0)
    .filter(t => t > 0);

  if (pushDates.length > 0) {
    const mostRecentPush = Math.max(...pushDates);
    lastActiveDaysAgo = Math.max(0, Math.floor((Date.now() - mostRecentPush) / (24 * 60 * 60 * 1000)));
  }

  const isActiveCoder = lastActiveDaysAgo !== null && lastActiveDaysAgo <= 45;

  // 5. Codebase Footprint in MB
  const totalKB = repos.reduce((acc, r) => acc + (r.size || 0), 0);
  const codebaseSizeMB = Math.round((totalKB / 1024) * 10) / 10;

  // 6. Follower to Following Ratio
  const followerRatio = user.following > 0 
    ? Math.round((user.followers / user.following) * 10) / 10 
    : user.followers;

  // 7. Flagship Repository Identification & Clone URL
  const topAuthored = [...authoredRepos].sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
    return b.forks_count - a.forks_count;
  })[0] || repos[0] || null;

  const topRepoName = topAuthored ? topAuthored.name : null;
  const topRepoCloneUrl = topAuthored ? `${topAuthored.html_url}.git` : null;

  // 8. Recent Activity Stream Analysis
  let recentCommitsCount = 0;
  let recentPRsCount = 0;

  events.forEach(event => {
    if (event.type === "PushEvent" && event.payload?.commits) {
      recentCommitsCount += event.payload.commits.length;
    }
    if (event.type === "PullRequestEvent") {
      recentPRsCount += 1;
    }
  });

  // 9. Primary Languages
  const langCounts: Record<string, number> = {};
  let totalLangs = 0;
  (authoredRepos.length > 0 ? authoredRepos : repos).forEach(r => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      totalLangs++;
    }
  });
  const primaryLanguages = Object.entries(langCounts)
    .filter(([, count]) => totalLangs > 0 && (count / totalLangs) >= 0.15)
    .map(([name]) => name);

  // 10. License Hygiene (Open source practice)
  const licenseSet = new Set<string>();
  let licensedReposCount = 0;
  authoredRepos.forEach(repo => {
    if (repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION") {
      licenseSet.add(repo.license.spdx_id);
      licensedReposCount++;
    }
  });
  const licenses = Array.from(licenseSet);

  // 11. Tech Stack & Ecosystem Signals
  const stackSet = new Set<string>();
  let systemsScore = 0;
  let webScore = 0;
  let mobileScore = 0;
  let aiScore = 0;
  let devopsScore = 0;

  repos.forEach(repo => {
    repo.topics?.forEach(topic => {
      const t = topic.toLowerCase();
      stackSet.add(t);
      if (["react", "nextjs", "vue", "svelte", "tailwind", "node"].includes(t)) webScore += 2;
      if (["docker", "kubernetes", "k8s", "terraform", "aws", "ci-cd"].includes(t)) devopsScore += 2;
      if (["ai", "llm", "machine-learning", "pytorch", "tensorflow"].includes(t)) aiScore += 2;
      if (["flutter", "react-native", "ios", "android", "swift"].includes(t)) mobileScore += 2;
    });

    const lang = (repo.language || "").toLowerCase();
    if (["typescript", "javascript", "html", "css"].includes(lang)) webScore += 1;
    if (["rust", "c", "c++", "zig", "go"].includes(lang)) systemsScore += 2;
    if (["python", "jupyter notebook"].includes(lang)) aiScore += 1;
    if (["dart", "swift", "kotlin"].includes(lang)) mobileScore += 2;
    if (["dockerfile", "hcl", "shell"].includes(lang)) devopsScore += 1;
  });

  const techStack = Array.from(stackSet)
    .filter(t => t.length > 2 && !["repo", "test", "demo"].includes(t))
    .slice(0, 10);

  // 12. Archetype Determination
  let archetype = "Full Stack Engineer";
  let archetypeDescription = "Builds robust end-to-end applications across frontend, backend, and cloud services.";

  if (authenticStars > 800) {
    archetype = "Open Source Maintainer";
    archetypeDescription = "Authors widely adopted open-source packages relied upon by the developer community.";
  } else if (systemsScore >= 6) {
    archetype = "Systems & Performance Engineer";
    archetypeDescription = "Specializes in low-level memory safety, compilers, infrastructure, or high-throughput runtimes.";
  } else if (aiScore >= 5) {
    archetype = "AI & Machine Learning Engineer";
    archetypeDescription = "Develops machine learning models, neural pipelines, embeddings, and generative AI systems.";
  } else if (devopsScore >= 5) {
    archetype = "Cloud & DevOps Architect";
    archetypeDescription = "Orchestrates scalable distributed infrastructure, container runtimes, and CI/CD pipelines.";
  } else if (mobileScore >= 4) {
    archetype = "Mobile Solutions Engineer";
    archetypeDescription = "Engineers polished native or cross-platform applications for iOS and Android platforms.";
  } else if (webScore >= 4) {
    archetype = "Modern Web Architect";
    archetypeDescription = "Crafts responsive, performant user interfaces and modern full-stack web applications.";
  }

  // 13. Workflow Rhythm
  let rhythm = "Consistent Maintainer";
  if (lastActiveDaysAgo !== null && lastActiveDaysAgo <= 7 && recentCommitsCount >= 5) {
    rhythm = "High-Velocity Shipper";
  } else if (lastActiveDaysAgo !== null && lastActiveDaysAgo <= 30) {
    rhythm = "Active Builder";
  } else if (lastActiveDaysAgo !== null && lastActiveDaysAgo > 180) {
    rhythm = "Periodic / Dormant";
  } else if (tenureYears >= 6) {
    rhythm = "Seasoned Contributor";
  }

  // 14. Production Health Score (50 - 98)
  let score = 55;
  if (lastActiveDaysAgo !== null && lastActiveDaysAgo <= 14) score += 12;
  else if (lastActiveDaysAgo !== null && lastActiveDaysAgo <= 45) score += 8;
  else if (lastActiveDaysAgo !== null && lastActiveDaysAgo > 180) score -= 8;

  if (authenticStars >= 500) score += 15;
  else if (authenticStars >= 100) score += 10;
  else if (authenticStars >= 20) score += 6;
  else if (authenticStars >= 5) score += 3;

  if (user.followers >= 200) score += 8;
  else if (user.followers >= 50) score += 5;
  else if (user.followers >= 10) score += 2;

  if (authoredCount >= 10) score += 6;
  else if (authoredCount >= 3) score += 3;

  if (authoredCount > 0 && (licensedReposCount / authoredCount) >= 0.4) score += 4;

  const healthScore = Math.min(Math.max(score, 50), 98);

  // 15. Achievements
  const achievements: string[] = [];
  if (tenureYears >= 5) achievements.push(`GitHub Veteran (${tenureYears} Years)`);
  if (authenticStars >= 50) achievements.push(`Starred Author (${authenticStars} ⭐)`);
  if (authoredCount >= 15) achievements.push("Prolific Builder");
  if (licensedReposCount >= 5) achievements.push("Open Source Steward");
  if (recentCommitsCount >= 10) achievements.push("Active Shipper (Recent Commits)");
  if (achievements.length === 0) achievements.push("Active Explorer");

  return {
    healthScore,
    archetype,
    archetypeDescription,
    rhythm,
    techStack,
    achievements,
    authenticStars,
    authoredReposCount: authoredCount,
    forkedReposCount: forkedCount,
    tenureYears,
    lastActiveDaysAgo,
    isActiveCoder,
    recentCommitsCount,
    recentPRsCount,
    licenses,
    codebaseSizeMB,
    primaryLanguages,
    topRepoName,
    topRepoCloneUrl,
    followerRatio,
    recentEvents: events.slice(0, 8),
  };
}

export function getTopRepos(repos: GitHubRepo[], filter: "all" | "authored" | "forks" = "authored") {
  let filtered = repos;
  if (filter === "authored") {
    filtered = repos.filter(r => !r.fork);
  } else if (filter === "forks") {
    filtered = repos.filter(r => r.fork);
  }

  if (filtered.length === 0) {
    filtered = repos;
  }

  return [...filtered]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime();
    })
    .slice(0, 6);
}