import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { Task, type TaskContext } from './core/Task.js'

type TaskModule = {
  default: new () => Task
}

const rootDir = resolve(process.cwd())
const runtimeDir = resolve(fileURLToPath(new URL('.', import.meta.url)))
const tasksDir = resolve(runtimeDir, 'tasks')

const context: TaskContext = {
  rootDir,
  lifecycleEvent: process.env.npm_lifecycle_event ?? null,
  nodeVersion: process.version,
  startedAt: new Date().toISOString(),
}

const entries = await readdir(tasksDir, { withFileTypes: true })
const taskFiles = entries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.js'))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b))

for (const taskFile of taskFiles) {
  const taskUrl = pathToFileURL(resolve(tasksDir, taskFile)).href
  const taskModule = (await import(taskUrl)) as TaskModule

  if (!taskModule.default) {
    throw new Error(`Task file ${taskFile} has no default export`)
  }

  const task = new taskModule.default()

  if (!(task instanceof Task)) {
    throw new Error(`Task ${taskFile} must extend Task`)
  }

  if (!(await task.shouldRun(context))) {
    console.log(`Skip task: ${task.name}`)
    continue
  }

  console.log(`Run task: ${task.name}`)
  await task.run(context)
}

