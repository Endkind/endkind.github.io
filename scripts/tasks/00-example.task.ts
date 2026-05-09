import { Task, type TaskContext } from '../core/Task.js'

export default class ExampleTask extends Task {
  readonly name = 'example-skip-math'

  async shouldRun(_context: TaskContext): Promise<boolean> {
    return false
  }

  async run(_context: TaskContext): Promise<void> {
    const result = 1 + 1
    console.log(`[example] 1 + 1 = ${result}`)
  }
}

