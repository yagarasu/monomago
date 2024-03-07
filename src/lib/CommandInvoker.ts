import { Command, Updatable } from "./types";

class CommandInvoker implements Updatable {
  _queue: Command[] = []

  update() {
    const queueLen = this._queue.length
    for (let i = 0; i < queueLen; i++) {
      const command = this._queue.shift()
      command?.execute()
    }
  }

  enqueue(command: Command) {
    this._queue.push(command)
  }
}

export default CommandInvoker
