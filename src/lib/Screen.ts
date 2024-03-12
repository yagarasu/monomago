export type ScreenOptions = {
  width: number
  height: number
}

class Screen {
  options: ScreenOptions
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D

  constructor(parent: HTMLElement, options: ScreenOptions) {
    this.options = options
    this.canvas = document.createElement('canvas')
    this.canvas.width = options.width
    this.canvas.height = options.height
    parent.appendChild(this.canvas)
    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Unable to get 2d context from canvas')
    this.context = context
    this.clear()
  }

  clear() {
    this.context.save()
    this.context.fillStyle = '#000000'
    this.context.fillRect(0, 0, this.options.width, this.options.height)
    this.context.restore()
  }
}

export default Screen
