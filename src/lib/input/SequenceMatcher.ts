import { CommandCreator, DisppatchCallback, SequenceMap } from "../types"

class SequenceMatcher {
  private map
  private commandCreator: CommandCreator
  private dispatchCallback: DisppatchCallback

  private elapsed = 0

  bufferSize = 5
  bufferTimeout: number = 3000
  private buffer: string[] = []

  constructor(
    sequenceMap: SequenceMap,
    commandCreator: CommandCreator,
    dispatchCallback: DisppatchCallback
  ) {
    this.map = sequenceMap
    this.commandCreator = commandCreator
    this.dispatchCallback = dispatchCallback

    window.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  private onKeyUp(e: KeyboardEvent) {
    this.buffer.push(e.key)
    if (this.buffer.length > this.bufferSize) this.buffer.shift()
  }

  update(elapsed: number) {
    this.elapsed += elapsed
    if (this.elapsed > this.bufferTimeout) {
      this.elapsed = 0
      this.buffer = []
    }
    for (const key in this.map) {
      if (Object.prototype.hasOwnProperty.call(this.map, key)) {
        const combo = this.map[key];
        const bufferSubsection = this.buffer.slice(combo.length * -1)
        if (combo.join(':::') === bufferSubsection.join(':::')) {
          const command = this.commandCreator(key)
          this.dispatchCallback(command)
        }
      }
    }
  }
}

export default SequenceMatcher
