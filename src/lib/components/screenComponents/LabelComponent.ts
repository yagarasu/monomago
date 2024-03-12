import { ScreenComponent } from "../handlers/ScreenComponentHandler";

class LabelComponent implements ScreenComponent {
  text: string = ''
  position = { x: 0, y: 0 }
  width: number = 0
  fill: string = '#ffffff'
  font: string = '16px monospace'

  get handler() {
    return 'ScreenComponentHandler'
  }

  constructor(text: string= '', x = 0, y = 0, width = 0) {
    this.text = text
    this.position.x = x
    this.position.y = y
    this.width = width
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.fillStyle = this.fill
    ctx.font = this.font
    ctx.textBaseline = 'hanging'
    ctx.fillText(this.text, 0, 0, this.width)
    ctx.restore()
  }
}

export default LabelComponent
