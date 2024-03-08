import Game from "../../lib/Game";
import Layer from "../../lib/graphics/Layer";
import Paragraph from "../../lib/graphics/Paragraph";
import State from "../../lib/stateManagement/State";
import { StateEventTypes } from "../../lib/stateManagement/StateEvent";

class InfoState extends State {
  ui: Layer = new Layer()
  info: Paragraph = new Paragraph('This is a sample game made to test all the features in this game engine. Feel free to use them as a template for your own games.')
  
  constructor(game: Game) {
    super(game)

    this.info.width = 350
    this.info.x = 50
    this.info.y = 50
    this.ui.addChild(this.info)

    this.addEventListener(StateEventTypes.STATE_STARTED, (e) => {
      if (e.target !== this) return
      this.game.screenRoot.addChild(this.ui)
    })
    this.addEventListener(StateEventTypes.STATE_ENDED, (e) => {
      if (e.target !== this) return
      this.game.screenRoot.removeById(this.ui.id)
    })
  }
}

export default InfoState
