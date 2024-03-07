import { v4 as uuid } from "uuid"
import { linear } from "../math/easing"
import { Updatable } from "../types"
import { TweenEvent, TweenEventTypes } from "./TweenEvent"
import { TweenableProperties, TweenableCurrentValues } from "./types"
import { clamp } from "../math"

class Tween<T = unknown> extends EventTarget implements Updatable {
  id: string
  target: T
  duration = 3_000
  elapsed = 0
  properties: TweenableProperties<T>
  initialValues: TweenableProperties<T>
  easingFunction: (a: number, b: number, t: number) => number = linear
  updateCallback: (currentValues: TweenableCurrentValues<T>) => void = () => undefined
  done = false
  enabled = true

  constructor(target: T, properties: TweenableProperties<T>, updateCallback: (currentValues: TweenableCurrentValues<T>) => void) {
    super()
    this.id = uuid()
    this.target = target
    this.properties = properties
    this.initialValues = {}
    this.updateCallback = updateCallback
    this.saveInitialValues()
  }

  stop() {
    this.enabled = false
  }

  start() {
    this.enabled = true
  }

  reset() {
    this.saveInitialValues()
    this.elapsed = 0
    this.done = false
  }

  update(elapsed: DOMHighResTimeStamp) {
    if (this.done) return
    if (!this.enabled) return
    if (this.elapsed === 0) this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_START, { startedAt: performance.now() }))
    this.elapsed += elapsed
    const t = clamp(this.elapsed / this.duration, 0, 1)
    this.updateValuesForT(t, elapsed)
    if (t === 1) {
      this.done = true
      this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_END, { endedAt: performance.now() }))
    }
  }

  updateValuesForT(t: number, elapsed: number) {
    const currentValues: TweenableCurrentValues<T> = {}
    let key: keyof TweenableProperties<T>
    for (key in this.properties) {
      if (Object.prototype.hasOwnProperty.call(this.properties, key)) {
        const initial = this.initialValues[key] as number ?? 0
        const final = this.properties[key] as number ?? 0
        const current = this.easingFunction(initial, final, t)
        currentValues[key] = current
      }
    }
    this.dispatchEvent(new TweenEvent(TweenEventTypes.TWEEN_CHANGE, {
      elapsedSinceLastUpdate: elapsed,
      elapsed: this.elapsed,
      t,
      currentValues,
    }))
    this.updateCallback(currentValues)
  }

  saveInitialValues() {
    let key: keyof TweenableProperties<T>
    for (key in this.properties) {
      if (Object.prototype.hasOwnProperty.call(this.properties, key)) {
        this.initialValues[key] = this.target[key]
      }
    }
  }
}

export default Tween
