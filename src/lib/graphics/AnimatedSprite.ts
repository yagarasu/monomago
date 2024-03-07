import ScreenElement from "./ScreenElement";
import { AnimationDefinition, Rect, Renderable } from "./types";

class AnimatedSprite extends ScreenElement implements Renderable {
  imgUrl: string
  img: HTMLImageElement
  width: number = 0
  height: number = 0
  atlas: Rect[]
  animations: Record<string, AnimationDefinition>
  
  ready = false
  currentAnimation?: string
  currentAnimationFrame: number = 0
  animationTime: number = 0
  lastFrame: number = 0
  
  imageSmoothing = false

  constructor(imgUrl: string, x: number = 0, y: number = 0, width: number = 0, height: number = 0, atlas: Rect[] = [], animations: Record<string, AnimationDefinition> = {}) {
    super()
    this.imgUrl = imgUrl
    this.img = new Image()
    this.img.src = imgUrl
    this.img.addEventListener('load', () => {
      this.ready = true
    })
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.atlas = atlas
    this.animations = animations
  }

  update() {
    if (!this.currentAnimation) return
    const now = performance.now()
    if (this.lastFrame === 0) this.lastFrame = now
    const delta = now - this.lastFrame
    this.lastFrame = now
    this.animationTime += delta
    const animationDefinition = this.animations[this.currentAnimation]
    const expectedAnimationTime = Array.isArray(animationDefinition.durations) ? animationDefinition.durations[this.currentAnimationFrame] : animationDefinition.durations
    if (this.animationTime >= expectedAnimationTime) {
      this.currentAnimationFrame++
      if (this.currentAnimationFrame >= animationDefinition.indices.length) {
        this.currentAnimationFrame = 0
      }
      this.animationTime = 0
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.ready) return
    if (!this.currentAnimation) return
    const { indices } = this.animations[this.currentAnimation]
    this.update()
    ctx.save()
    ctx.imageSmoothingEnabled = this.imageSmoothing
    ctx.translate(this.x, this.y)
    const cropArea = this.atlas[indices[this.currentAnimationFrame]]
    ctx.drawImage(this.img, cropArea.x, cropArea.y, cropArea.width, cropArea.height, 0, 0, this.width, this.height)
    ctx.restore()
  }
}

export default AnimatedSprite
