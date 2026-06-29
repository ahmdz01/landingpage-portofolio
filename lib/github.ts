export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export async function getGithubRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {
      revalidate: 60 * 60, // 1 jam
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repositories.");
  }

  const repos: Repo[] = await res.json();

  return repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 9);
}
