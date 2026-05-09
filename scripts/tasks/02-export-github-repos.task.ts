import {Task, type TaskContext} from '../core/Task.js'
import {mkdir, writeFile} from "node:fs/promises";
import {dirname, resolve} from "node:path";
import {GitHubUtils} from "@src/ts/utils/github.js";

export default class ExampleTask extends Task {
    readonly name = 'Export GitHub Repos'

    async run(_context: TaskContext): Promise<void> {
        const owner = process.env.GITHUB_REPOSITORY_OWNER ?? 'Endkind'
        const data = await GitHubUtils.get_repos_data(owner);
        const output_path = resolve(_context.rootDir, 'src/json/github/repos.json');

        await mkdir(dirname(output_path), {recursive: true});
        await writeFile(output_path, JSON.stringify(data, null, 2));
    }
}
