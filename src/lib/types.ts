export interface Updatable {
  update: (ts: DOMHighResTimeStamp, delta: number) => void
}

export interface Command {
  execute: () => void
}
