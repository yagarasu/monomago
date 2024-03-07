import Tween from "./Tween"
import { TweenableCurrentValues, TweenableProperties } from "./types"
import { Updatable } from '../types'
import TweenLoop from "./TweenLoop"
import TweenBoomerang from "./TweenBoomerang"

class TweenManager implements Updatable {
  tweens: Record<string, Tween> = {}

  createTween<T>(target: T, properties: TweenableProperties<T>, updateCallback: (currentValues: TweenableCurrentValues<T>) => void) {
    const tween = new Tween<T>(target, properties, updateCallback)
    this.tweens[tween.id] = tween
    return tween
  }

  createLoop<T>(target: T, properties: TweenableProperties<T>, updateCallback: (currentValues: TweenableCurrentValues<T>) => void) {
    const tween = new TweenLoop<T>(target, properties, updateCallback)
    this.tweens[tween.id] = tween
    return tween
  }

  createBoomerang<T>(target: T, properties: TweenableProperties<T>, updateCallback: (currentValues: TweenableCurrentValues<T>) => void) {
    const tween = new TweenBoomerang<T>(target, properties, updateCallback)
    this.tweens[tween.id] = tween
    return tween
  }

  getById(id: string) {
    return this.tweens[id]
  }

  update(elapsed: DOMHighResTimeStamp) {
    for (const id in this.tweens) {
      if (Object.prototype.hasOwnProperty.call(this.tweens, id)) {
        const tween = this.tweens[id];
        tween.update(elapsed)
      }
    }
  }
}

export default TweenManager
