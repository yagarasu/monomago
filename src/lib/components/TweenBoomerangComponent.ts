import { clamp } from '../math'
import TweenComponent from './TweenComponent'

class TweenBoomerangComponent<T extends object = {}> extends TweenComponent<T> {
  reverse = false
  update(elapsed: number): void {
    if (this.done) return
    if (!this.enabled) return
    return (this.reverse)
      ? this.updateReverse(elapsed)
      : this.updateForward(elapsed)
  }

  updateForward(elapsed: number) {
    this.elapsed += elapsed
    const t = clamp(this.elapsed / this.duration, 0, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 1) {
      this.reverse = true
    }
  }

  updateReverse(elapsed: number) {
    this.elapsed = clamp(this.elapsed - elapsed, 0)
    const t = clamp(this.elapsed / this.duration, 0, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 0) {
      this.reverse = false
    }
  }
}

export default TweenBoomerangComponent
