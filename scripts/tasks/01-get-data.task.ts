import { Task, type TaskContext } from '../core/Task.js'
import {dirname, resolve} from "node:path";
import {mkdir, writeFile} from "node:fs/promises";
import {GitHubUser} from "@src/ts/schemas/github.js";

export default class ExampleTask extends Task {
  readonly name = 'Get Data'

  async run(_context: TaskContext): Promise<void> {
    const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'Endkind'
    const data = await this.get_data(owner);
    const output_path_favicon = resolve(_context.rootDir, 'public/favicon.png');
    const output_path_data = resolve(_context.rootDir, 'src/json/github/profile.json');


    const avatar_response = await fetch(data.avatar_url);
    if (!avatar_response.ok) {
      throw new Error(`Avatar download error: ${avatar_response.status}`);
    }

    const avatar_buffer = Buffer.from(await avatar_response.arrayBuffer());

    await mkdir(dirname(output_path_favicon), { recursive: true });
    await writeFile(output_path_favicon, avatar_buffer);

    await mkdir(dirname(output_path_data), { recursive: true });
    await writeFile(output_path_data, JSON.stringify(data, null, 2));
  }

  private async get_data(username: string): Promise<GitHubUser> {
    const url = `https://api.github.com/users/${username}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const user = (await response.json()) as Record<string, any>;

    return {
      id: user.id,
      name: user.login,
      avatar_url: user.avatar_url
    };
  }
}
