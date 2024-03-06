import Tween from "./Tween";
import { TweenEvent, TweenEventTypes } from "./TweenEvent";

class TweenLoop<T> extends Tween<T> {
  update(elapsed: number): void {
    if (this.done) return
    if (!this.enabled) return
    if (this.elapsed === 0) this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_START, { startedAt: performance.now() }))
    this.elapsed += elapsed
    const t = Math.min(this.elapsed / this.duration, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 1) {
      this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_END, { endedAt: performance.now() }))
      this.elapsed = 0
    }
  }
}

export default TweenLoop
