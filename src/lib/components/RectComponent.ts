class RectComponent {
  position = { x: 10, y: 10 }
  size = { width: 50, height: 50 }
  fill: string = 'red'

  get handler() {
    return 'ScreenComponentHandler'
  }

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    this.position.x = x
    this.position.y = y
    this.size.width = width
    this.size.height = height
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.fillStyle = this.fill
    ctx.fillRect(0, 0, this.size.width, this.size.height)
    ctx.restore()
  }
}

export default RectComponent
