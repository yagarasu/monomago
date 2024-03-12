import { ScreenComponent } from "../handlers/ScreenComponentHandler";

class LayerComponent implements ScreenComponent {
  position = { x: 0, y: 0 }
  children: ScreenComponent[] = []

  get handler() {
    return 'ScreenComponentHandler'
  }

  addChild(child: ScreenComponent, position: number = -1) {
    this.children.splice(position, 0, child)
  }

  removeChild(position: number) {
    return this.children.splice(position, 1)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    this.children.forEach((child) => {
      child.render(ctx)
    })
    ctx.restore()
  }
}

export default LayerComponent
