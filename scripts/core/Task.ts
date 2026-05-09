export type TaskContext = {
  rootDir: string
  lifecycleEvent: string | null
  nodeVersion: string
  startedAt: string
}

export abstract class Task {
  abstract readonly name: string

  async shouldRun(_context: TaskContext): Promise<boolean> {
    return true
  }

  abstract run(context: TaskContext): Promise<void>
}
