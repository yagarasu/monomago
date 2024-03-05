import ScreenElement from "./ScreenElement";
import { Rect, Renderable } from "./types";

class FillRect extends ScreenElement implements Renderable {
  width: number = 0
  height: number = 0
  fill: string = '#ff0000'

  constructor(rect: Rect = { x: 0, y: 0, width: 0, height: 0 }) {
    super()
    this.x = rect.x
    this.y = rect.y
    this.width = rect.width
    this.height = rect.height
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.fill
    ctx.fillRect(0, 0, this.width, this.height)
    ctx.restore()
  }
}

export default FillRect
