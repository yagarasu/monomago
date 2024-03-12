import { clamp } from "../math";
import TweenComponent from "./TweenComponent";

class TweenLoopComponent<T extends object = {}> extends TweenComponent<T> {
  update(elapsed: number): void {
    if (this.done) return
    if (!this.enabled) return
    this.elapsed += elapsed
    const t = clamp(this.elapsed / this.duration, 0, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 1) {
      this.elapsed = 0
    }
  }
}

export default TweenLoopComponent
