import Game from "../lib/Game";
import Tween from "../lib/animation/Tween";
import { TweenEventTypes } from "../lib/animation/TweenEvent";
import AnimatedSprite from "../lib/graphics/AnimatedSprite";
import AtlasMaker from "../lib/graphics/AtlasMaker";
import Color from "../lib/graphics/Color";
import FillRect from "../lib/graphics/FillRect";
import Layer from "../lib/graphics/Layer";
import Sprite from "../lib/graphics/Sprite";
import Vector from "../lib/math/Vector";
import State from "../lib/stateManagement/State";
import { StateEventTypes } from "../lib/stateManagement/StateEvent";
import sprite from './sprite.png'

class MainMenuState extends State {
  ui: Layer
  rect: FillRect
  rect2: FillRect
  rect3: FillRect
  color: Color = new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255, 1)
  sprite: Sprite
  animSprite: AnimatedSprite

  constructor(game: Game) {
    super(game)

    this.ui = new Layer()
    this.rect = new FillRect({ x: 10, y: 10, width: 50, height: 50 })
    this.rect2 = new FillRect({ x: 10, y: 110, width: 50, height: 50 })
    this.rect3 = new FillRect({ x: 10, y: 210, width: 50, height: 50 })
    this.ui.addChild(this.rect)
    this.ui.addChild(this.rect2)
    this.ui.addChild(this.rect3)
    
    this.sprite = new Sprite(sprite, 10, 260, { x: 0, y: 0, width: 24, height: 24 })
    this.sprite.width = 48
    this.sprite.height = 48
    this.ui.addChild(this.sprite)

    this.animSprite = new AnimatedSprite(sprite, 10, 300, 48, 48, AtlasMaker.atlasFromGrid(24, 1, 24, 24), { run: { indices: [1,2,3,4], durations: 100 } })
    this.animSprite.currentAnimation = 'run'
    this.ui.addChild(this.animSprite)

    this.game.tweenManager.createTween(this.rect, { x: 660 }, (v) => this.rect.x = v.x ?? 0)
    this.game.tweenManager.createLoop(this.rect2, { x: 660 }, (v) => this.rect2.x = v.x ?? 0)
    this.game.tweenManager.createBoomerang(this.rect3, { x: 660 }, (v) => this.rect3.x = v.x ?? 0)

    this.game.tweenManager.createTween(this.color, {
      red: Math.random() * 255,
      green: Math.random() * 255,
      blue: Math.random() * 255
    }, (v) => {
      this.color.red = Math.round(v.red ?? 0)
      this.color.green = Math.round(v.green ?? 0)
      this.color.blue = Math.round(v.blue ?? 0)
      this.rect3.fill = this.color.toString()
    }).addEventListener(TweenEventTypes.TWEEN_END, (e) => {
      if (e.target !== null) {
        const tween = e.target as Tween<Color>
        tween.reset()
        tween.properties.red = Math.random() * 255
        tween.properties.green = Math.random() * 255
        tween.properties.blue = Math.random() * 255
      }
    })

    this.addEventListener(StateEventTypes.STATE_STARTED, () => {
      this.game.screen.root.addChild(this.ui)
    })
    this.addEventListener(StateEventTypes.STATE_ENDED, () => {
      this.game.screen.root.removeById(this.ui.id)
    })
  }

  update(_elapsed: number, delta: number): void {
    const direction = this.game.keyboard.getDirectionVector()
    const rectPos = Vector.vectorFromPositionable(this.rect)
    rectPos.add(direction.multiplyScalar(delta))
    rectPos.applyVectorToPositionable(this.rect)
    if (this.game.keyboard.comboMatches(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'])) {
      this.rect2.fill = '#00ff00'
    }
  }
}

export default MainMenuState
