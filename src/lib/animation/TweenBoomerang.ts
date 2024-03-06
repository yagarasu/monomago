import Tween from './Tween'
import { TweenEvent, TweenEventTypes } from './TweenEvent'

class TweenBoomerang<T> extends Tween<T> {
  reverse = false
  update(elapsed: number): void {
    if (this.done) return
    if (!this.enabled) return
    if (this.elapsed === 0) this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_START, { startedAt: performance.now() }))
    return (this.reverse)
      ? this.updateReverse(elapsed)
      : this.updateForward(elapsed)
  }

  updateForward(elapsed: number) {
    this.elapsed += elapsed
    const t = Math.min(this.elapsed / this.duration, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 1) {
      this.reverse = true
      this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_END, { endedAt: performance.now() }))
    }
  }

  updateReverse(elapsed: number) {
    this.elapsed -= elapsed
    const t = Math.max(this.elapsed / this.duration, 0)
    this.updateValuesForT(t, elapsed)
    if (t === 0) {
      this.reverse = false
      this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_END, { endedAt: performance.now() }))
    }
  }
}

export default TweenBoomerang
