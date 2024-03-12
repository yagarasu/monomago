import Element from "../lib/Element"
import AtlasMaker from "../lib/animation/AtlasMaker"
// import RectComponent from "../lib/components/screenComponents/RectComponent"
import TweenComponent from "../lib/components/TweenComponent"
import AnimatedSpriteComponent from "../lib/components/screenComponents/AnimatedSpriteComponent"
import imgSprite from './sprite.png'

class Player extends Element {
  // private rect: RectComponent
  private sprite: AnimatedSpriteComponent
  private tween: TweenComponent

  constructor() {
    super()
    // this.rect = new RectComponent(10, 10, 50, 50)
    this.sprite = new AnimatedSpriteComponent(imgSprite, 10, 300, 48, 48, AtlasMaker.atlasFromGrid(24, 1, 24, 24), { run: { indices: [1, 2, 3, 4], durations: 100 } })
    this.sprite.currentAnimation = 'run'
    this.tween = new TweenComponent<{ x: number }>({ x: 10 }, { x: 720 - 50 - 10 }, (v) => {
      this.sprite.position.x = v.x ?? 0
    })

    this.setComponents([
      this.sprite,
      this.tween,
    ])
  }

  get position() {
    return this.sprite.position
  }

  move(x: number, y: number) {
    this.sprite.position.x = x
    this.sprite.position.y = y
  }
}

export default Player
