export interface Updatable {
  update: (ts: DOMHighResTimeStamp, delta: number) => void
}