export type GitHubUser = {
  id: number;
  name: string;
  avatar_url: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  fork: boolean;
  homepage: string | null;
  pages_url: string | null;
  stars: number;
  language: string | null;
  archived: boolean;
  is_template: boolean;
  topics: string[];
  forks: number;
  open_issues: number;
  watchers: boolean;
  owner: GitHubUser;
};
