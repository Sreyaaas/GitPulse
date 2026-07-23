import { GitHubUser, GitHubRepo } from "@/types/github";

const GITHUB_API_URL = "https://api.github.com";

export async function getGitHubData(username: string) {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_API_URL}/users/${username}`),
      fetch(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`)
    ]);

    // If user doesn't exist or rate limit is hit, return null gracefully (No crashes)
    if (!userRes.ok) {
      return null;
    }
    
    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    return { user, repos };
  } catch (error) {
    console.error("Network or API failure:", error);
    return null;
  }
}