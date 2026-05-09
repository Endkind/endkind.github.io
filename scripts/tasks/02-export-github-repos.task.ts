import {Task, type TaskContext} from '../core/Task.js'
import type {GitHubRepo} from '@src/ts/schemas/github.js';
import {mkdir, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";
import * as console from "node:console";

export default class ExampleTask extends Task {
    readonly name = 'Export GitHub Repos'

    async run(_context: TaskContext): Promise<void> {
        const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'Endkind'
        const data = await this.get_repos_data(owner);
        const output_path = resolve(_context.rootDir, 'src/json/github/repos.json');

        await mkdir(dirname(output_path), {recursive: true});
        await writeFile(output_path, JSON.stringify(data, null, 2));
    }

    private async get_repos_data(username: string): Promise<GitHubRepo[]> {
        const url = `https://api.github.com/users/${username}/repos`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            const data = await response.json() as any[];

            const repos: GitHubRepo[] = await Promise.all(
                data
                    .filter((repo: any) => !repo.disabled)
                    .map(async (repo: any) => {
                        const homepage = repo.homepage ? repo.homepage : null;
                        const pages_url = repo.has_pages ? await this.get_pages_url(repo.owner.login, repo.name) : null;

                        return {
                            id: repo.id,
                            name: repo.name,
                            url: repo.html_url,
                            description: repo.description,
                            fork: repo.fork,
                            homepage: homepage,
                            pages_url: pages_url,
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
                    })
            );

            return repos
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
        } catch (error) {
            console.error('Error fetching repositories:', error);
            throw error;
        }
    }

    private async get_pages_url(owner: string, repo: string): Promise<string | null> {
        try {
            const default_pages_url = `https://${owner}.github.io/${repo}`.toLowerCase();

            //region: `https://{owner}.github.io/{repo}`
            let response = await fetch(default_pages_url);

            if (response.ok) {
                return default_pages_url;
            }
            //endregion

            //TODO: Extend for non `https://{owner}.github.io/{repo}` GitHub Pages URL
        } catch (error) {
            console.error('Error finding GitHub Pages URL:', error);
            throw error;
        }

        return null;
    }
}
