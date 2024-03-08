import { v4 as uuid } from 'uuid'
import { Positionable, Renderable } from "./types"
import Vector from '../math/Vector'

class ScreenElement implements Positionable, Renderable {
  id: string

  x: number = 0
  y: number = 0

  get position() {
    return Vector.vectorFromPositionable(this)
  }

  set position(v: Vector) {
    v.applyVectorToPositionable(this)
  }

  constructor() {
    this.id = uuid()
  }

  render(_ctx: CanvasRenderingContext2D) {}
}

export default ScreenElement
