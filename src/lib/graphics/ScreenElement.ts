import { v4 as uuid } from 'uuid'
import { Positionable, Renderable } from "./types"

class ScreenElement implements Positionable, Renderable {
  id: string

  x: number = 0
  y: number = 0

  constructor() {
    this.id = uuid()
  }

  render(_ctx: CanvasRenderingContext2D) {}
}

export default ScreenElement
