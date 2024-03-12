import { Rect } from "../../types"
import { ScreenComponent } from "../handlers/ScreenComponentHandler"

class SpriteComponent implements ScreenComponent {
  imgUrl: string
  img: HTMLImageElement
  ready = false
  width: number = 0
  height: number = 0
  cropArea?: Rect
  imageSmoothing = false
  position = { x: 0, y: 0 }

  get handler() {
    return 'ScreenComponentHandler'
  }

  constructor(imgUrl: string, x: number = 0, y: number = 0, cropArea?: Rect) {
    this.imgUrl = imgUrl
    this.img = new Image()
    this.img.src = imgUrl
    this.img.addEventListener('load', () => {
      if (!cropArea) {
        this.width = this.img.naturalWidth
        this.height = this.img.naturalHeight
      }
      this.ready = true
    })
    this.position.x = x
    this.position.y = y
    this.cropArea = cropArea
    if (cropArea) {
      this.width = cropArea.width
      this.height = cropArea.height
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.ready) return
    ctx.save()
    ctx.imageSmoothingEnabled = this.imageSmoothing
    ctx.translate(this.position.x, this.position.y)
    if (!this.cropArea) ctx.drawImage(this.img, 0, 0, this.width, this.height)
    if (this.cropArea) ctx.drawImage(this.img, this.cropArea.x, this.cropArea.y, this.cropArea.width, this.cropArea.height, 0, 0, this.width, this.height)
    ctx.restore()
  }
}

export default SpriteComponent
