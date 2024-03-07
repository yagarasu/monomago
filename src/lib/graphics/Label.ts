import ScreenElement from "./ScreenElement";
import { Renderable } from "./types";

class Label extends ScreenElement implements Renderable {
  text: string = ''
  width: number = 0
  fill: string = '#ffffff'
  font: string = '16px monospace'

  constructor(text: string= '', x = 0, y = 0, width = 0) {
    super()
    this.text = text
    this.x = x
    this.y = y
    this.width = width
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.fill
    ctx.font = this.font
    ctx.textBaseline = 'hanging'
    ctx.fillText(this.text, 0, 0, this.width)
    ctx.restore()
  }
}

export default Label
