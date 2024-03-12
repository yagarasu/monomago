import { clamp } from "../math"
import { linear } from "../math/easing"

export type TweenableProperties<T> = Partial<Omit<T, { [K in keyof T]-?: T[K] extends number ? never : K }[keyof T]>>
export type TweenableCurrentValues<T> = { [key in keyof T]?: number }
export type UpdateCallback<T> = (currentValues: TweenableCurrentValues<T>) => void

class TweenComponent<T extends object = {}> {
  duration = 3_000
  elapsed = 0
  initialValues: TweenableProperties<T>
  finalValues: TweenableProperties<T>
  easingFunction: (a: number, b: number, t: number) => number = linear
  updateCallback: UpdateCallback<T> = () => undefined
  done = false
  enabled = true

  get handler() {
    return 'TweenComponentHandler'
  }

  constructor(initialValues: T, finalValues: T, updateCallback: UpdateCallback<T>) {
    this.initialValues = initialValues
    this.finalValues = finalValues
    this.updateCallback = updateCallback
  }

  stop() {
    this.enabled = false
  }

  start() {
    this.enabled = true
  }

  reset(initialValues?: TweenableProperties<T>) {
    if (initialValues) {
      this.initialValues = initialValues
    }
    this.elapsed = 0
    this.done = false
  }

  update(elapsed: number, _delta: number) {
    if (this.done) return
    if (!this.enabled) return
    // if (this.elapsed === 0) this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_START, { startedAt: performance.now() }))
    this.elapsed += elapsed
    const t = clamp(this.elapsed / this.duration, 0, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 1) {
      this.done = true
      // this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_END, { endedAt: performance.now() }))
    }
  }

  updateValuesForT(t: number, _elapsed: number) {
    const currentValues: TweenableCurrentValues<T> = {}
    let key: keyof TweenableProperties<T>
    for (key in this.initialValues) {
      if (Object.prototype.hasOwnProperty.call(this.initialValues, key) && Object.prototype.hasOwnProperty.call(this.finalValues, key)) {
        const initial = this.initialValues[key] as number ?? 0
        const final = this.finalValues[key] as number ?? 0
        const current = this.easingFunction(initial, final, t)
        currentValues[key] = current
      }
    }
    // this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_CHANGE, {
    //   elapsedSinceLastUpdate: elapsed,
    //   elapsed: this.elapsed,
    //   t,
    //   currentValues,
    // }))
    this.updateCallback(currentValues)
  }
}

export default TweenComponent
