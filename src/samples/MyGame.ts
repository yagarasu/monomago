import Game from "../lib/Game";
import State from "../lib/stateManagement/State";
import InfoState from "./InfoState/InfoState";
import MainMenuState from "./MainMenuState/MainMenuState";

class MyGame extends Game {
  states: Record<string, State> = {
    mainMenu: new MainMenuState(this),
    info: new InfoState(this),
  }

  run() {
    super.run(this.states.mainMenu)
  }
}

export default MyGame
