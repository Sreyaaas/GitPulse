export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  html_url: string;
  hireable: boolean | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  created_at: string;
  html_url: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  open_issues_count: number;
  size: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
  } | null;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    pull_request?: {
      title: string;
      html_url: string;
      merged?: boolean;
    };
    issue?: {
      title: string;
      html_url: string;
    };
  };
}

export interface LanguageStat {
  name: string;
  percentage: number;
  count: number;
  color?: string;
}

export interface DeveloperInsights {
  healthScore: number;
  archetype: string;
  archetypeDescription: string;
  rhythm: string;
  techStack: string[];
  achievements: string[];
  authenticStars: number;
  authoredReposCount: number;
  forkedReposCount: number;
  tenureYears: number;
  lastActiveDaysAgo: number | null;
  isActiveCoder: boolean;
  recentCommitsCount: number;
  recentPRsCount: number;
  licenses: string[];
  codebaseSizeMB: number;
  primaryLanguages: string[];
  topRepoName: string | null;
  topRepoCloneUrl: string | null;
  followerRatio: number;
  recentEvents: GitHubEvent[];
}