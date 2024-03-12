import { Command } from "../types"

class CommandManager {
  private queue: Command[] = []

  enqueue(command: Command) {
    this.queue.push(command)
  }

  update(elapsed: number, delta: number) {
    const queueLen = this.queue.length
    for (let i = 0; i < queueLen; i++) {
      const command = this.queue.shift()
      command?.execute(elapsed, delta)
    }
  }
}

export default CommandManager
