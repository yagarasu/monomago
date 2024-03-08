import Game from "../../lib/Game";
import Layer from "../../lib/graphics/Layer";
import State from "../../lib/stateManagement/State";

class InfoState extends State {
  ui: Layer = new Layer()
  
  constructor(game: Game) {
    super(game)
  }
}

export default InfoState
