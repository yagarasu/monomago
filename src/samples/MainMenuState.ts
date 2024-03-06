import Game from "../lib/Game";
import Tween from "../lib/animation/Tween";
import TweenBoomerang from "../lib/animation/TweenBoomerang";
import TweenLoop from "../lib/animation/TweenLoop";
import FillRect from "../lib/graphics/FillRect";
import Layer from "../lib/graphics/Layer";
import Vector from "../lib/math/Vector";
import State from "../lib/stateManagement/State";
import { StateEventTypes } from "../lib/stateManagement/StateEvent";

class MainMenuState extends State {
  ui: Layer
  rect: FillRect
  rect2: FillRect
  rect3: FillRect

  tween: Tween<FillRect>
  tween2: TweenBoomerang<FillRect>
  tween3: TweenLoop<FillRect>

  constructor(game: Game) {
    super(game)
    this.ui = new Layer()
    this.rect = new FillRect({ x: 10, y: 10, width: 50, height: 50 })
    this.rect2 = new FillRect({ x: 10, y: 110, width: 50, height: 50 })
    this.rect3 = new FillRect({ x: 10, y: 210, width: 50, height: 50 })
    this.tween = new Tween(this.rect, { x: 500 }, (v) => {
      this.rect.x = v.x ?? 0
    })
    this.tween2 = new TweenBoomerang(this.rect2, { x: 500 }, (v) => {
      this.rect2.x = v.x ?? 0
    })
    this.tween3 = new TweenLoop(this.rect3, { x: 500 }, (v) => {
      this.rect3.x = v.x ?? 0
    })
    this.tween.addEventListener('tweenstart', (e) => {
      console.log('> tween start', e)
    })
    this.tween.addEventListener('tweenchange', (e) => {
      console.log('> tween chng', e)
    })
    this.tween.addEventListener('tweenend', (e) => {
      console.log('> tween end', e)
    })
    this.ui.addChild(this.rect)
    this.ui.addChild(this.rect2)
    this.ui.addChild(this.rect3)
    this.addEventListener(StateEventTypes.STATE_STARTED, () => {
      this.game.screen.root.addChild(this.ui)
    })
    this.addEventListener(StateEventTypes.STATE_ENDED, () => {
      this.game.screen.root.removeById(this.ui.id)
    })
  }

  update(elapsed: number, delta: number): void {
    const direction = this.game.keyboard.getDirectionVector()
    const rectPos = Vector.vectorFromPositionable(this.rect)
    rectPos.add(direction.multiplyScalar(delta))
    rectPos.applyVectorToPositionable(this.rect)
    if (this.game.keyboard.comboMatches(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'])) {
      this.rect.fill = '#00ff00'
    }
    this.tween.update(elapsed)
    this.tween2.update(elapsed)
    this.tween3.update(elapsed)
  }
}

export default MainMenuState
