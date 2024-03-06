import ScreenElement from "./ScreenElement";
import { Renderable } from "./types";

class Layer extends ScreenElement implements Renderable {
  children: ScreenElement[] = []

  addChild(child: ScreenElement, position: number = -1) {
    this.children.splice(position, 0, child)
  }

  removeChild(position: number) {
    return this.children.splice(position, 1)
  }

  removeById(id: string) {
    const idx = this.children.findIndex((child) => child.id === id)
    this.removeChild(idx)
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    this.children.forEach((child) => {
      child.render(ctx)
    })
    ctx.restore()
  }
}

export default Layer
