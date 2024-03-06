import Game from "../lib/Game";
import FillRect from "../lib/graphics/FillRect";
import Layer from "../lib/graphics/Layer";
import Vector from "../lib/math/Vector";
import State from "../lib/stateManagement/State";
import { StateEventTypes } from "../lib/stateManagement/StateEvent";

class MainMenuState extends State {
  ui: Layer
  rect: FillRect

  constructor(game: Game) {
    super(game)
    this.ui = new Layer()
    this.rect = new FillRect({ x: 10, y: 10, width: 50, height: 50 })
    this.ui.addChild(this.rect)
    this.addEventListener(StateEventTypes.STATE_STARTED, () => {
      this.game.screen.root.addChild(this.ui)
    })
    this.addEventListener(StateEventTypes.STATE_ENDED, () => {
      this.game.screen.root.removeById(this.ui.id)
    })
  }

  update(_ts: number, delta: number): void {
    const direction = this.game.keyboard.getDirectionVector()
    const rectPos = Vector.vectorFromPositionable(this.rect)
    rectPos.add(direction.multiplyScalar(delta))
    rectPos.applyVectorToPositionable(this.rect)
    if (this.game.keyboard.comboMatches(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'])) {
      this.rect.fill = '#00ff00'
    }
  }
}

export default MainMenuState
