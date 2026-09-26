import { GitHubUser, GitHubRepo, GitHubEvent } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

export async function getGitHubData(username: string) {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitPulse-App",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`${GITHUB_API_URL}/users/${username}`, {
        headers,
        next: { revalidate: 1800 }, // Cache 30 mins
      }),
      fetch(`${GITHUB_API_URL}/users/${username}/repos?sort=pushed&per_page=100`, {
        headers,
        next: { revalidate: 1800 },
      }),
      fetch(`${GITHUB_API_URL}/users/${username}/events/public?per_page=30`, {
        headers,
        next: { revalidate: 300 }, // Cache 5 mins
      }),
    ]);

    if (!userRes.ok) {
      return null;
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = reposRes.ok ? await reposRes.json() : [];
    const events: GitHubEvent[] = eventsRes.ok ? await eventsRes.json() : [];

    return { user, repos, events };
  } catch (error) {
    console.error("Network or GitHub API failure:", error);
    return null;
  }
}