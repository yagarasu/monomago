import ScreenElement from "../../lib/graphics/ScreenElement";
import Sprite from "../../lib/graphics/Sprite";
import { Renderable } from "../../lib/graphics/types";
import arrowSprite from '../sprite.png'

type ButtonListItem = { label: string }

class ButtonList extends ScreenElement implements Renderable {
  items: ButtonListItem[] = []

  _arrow: Sprite = new Sprite(arrowSprite, 0, 0, { x: 0, y: 0, width: 24, height: 24 })

  selectedItem = 0

  get maxItemIndex() {
    return this.items.length - 1
  }

  constructor(items: ButtonListItem[] = []) {
    super()
    this.items = items
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.font = '20px sans-serif'
    ctx.textBaseline = 'hanging'
    this.items.forEach((item, i) => {
      const dy = i * 40
      if (i === this.selectedItem) {
        ctx.fillStyle = 'red'
      } else {
        ctx.fillStyle = 'white'
      }
      ctx.fillText(item.label, 50, dy)
    })
    this._arrow.y = (this.selectedItem * 40) + 2
    this._arrow.render(ctx)
    ctx.restore()
  }
}

export default ButtonList
