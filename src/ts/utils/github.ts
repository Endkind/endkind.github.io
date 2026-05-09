import type {GitHubRepo} from "@ts/schemas/github.ts";

export class GitHubUtils {
    static async getRepositoriesFromUser(username: string): Promise<GitHubRepo[]> {
        const url = `https://api.github.com/users/${username}/repos`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const data = await response.json();

            const repos: GitHubRepo[] = data
                .filter((repo: any) => !repo.disabled)
                .map((repo: any) => {
                    const isUserPageRepo = repo.name?.toLowerCase() === `${repo.owner?.login?.toLowerCase()}.github.io`;
                    const defaultPagesUrl = `https://${repo.owner?.login}.github.io${isUserPageRepo ? "" : `/${repo.name}`}`;

                    return {
                        id: repo.id,
                        name: repo.name,
                        url: repo.html_url,
                        description: repo.description,
                        fork: repo.fork,
                        homepage: repo.homepage,
                        pages_url: repo.has_pages ? (repo.homepage || defaultPagesUrl) : null,
                        stars: repo.stargazers_count,
                        language: repo.language,
                        archived: repo.archived,
                        is_template: repo.is_template,
                        topics: repo.topics || [],
                        forks: repo.forks_count,
                        open_issues: repo.open_issues_count,
                        watchers: repo.watchers > 0,
                        owner: {
                            id: repo.owner.id,
                            name: repo.owner.login,
                            avatar_url: repo.owner.avatar_url,
                        },
                    };
                });
            console.log(repos);
            const sortedRepos = repos
                .map((repo, index) => ({repo, index}))
                .sort((a, b) => {
                    if (b.repo.stars !== a.repo.stars) {
                        return b.repo.stars - a.repo.stars;
                    }
                    if (b.repo.forks !== a.repo.forks) {
                        return b.repo.forks - a.repo.forks;
                    }
                    return a.index - b.index;
                })
                .map(({repo}) => repo);

            return sortedRepos;
        } catch (error) {
            console.error('Error fetching repositories:', error);
            throw error;
        }
    }
}