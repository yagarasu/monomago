import CommandInvoker from "../../lib/CommandInvoker";
import Game from "../../lib/Game";
import Label from "../../lib/graphics/Label";
import Layer from "../../lib/graphics/Layer";
import InputMapper from "../../lib/input/InputMapper";
import State from "../../lib/stateManagement/State";
import { StateEventTypes } from "../../lib/stateManagement/StateEvent";
import InfoState from "../InfoState/InfoState";
import ButtonList from "./ButtonList";
import MenuSelectDownCommand from "./MenuSelectDownCommand";
import MenuSelectUpCommand from "./MenuSelectUpCommand";

class MainMenuState extends State {
  commandInvoker: CommandInvoker
  inputMapper: InputMapper

  otherScreens = {
    info: new InfoState(this.game)
  }
  
  ui: Layer = new Layer()
  selection: Label
  buttonList: ButtonList = new ButtonList([
    { label: 'Extra Info', screen: this.otherScreens.info }
  ])

  constructor(game: Game) {
    super(game)

    this.selection = new Label('Selection: ' + this.buttonList.selectedItem, 10, 10, 200)
    this.ui.addChild(this.selection)
    
    this.buttonList.y = 50
    this.buttonList.x = 50
    this.ui.addChild(this.buttonList)

    this.commandInvoker = new CommandInvoker()

    this.inputMapper = new InputMapper({
      'ArrowUp': () => new MenuSelectUpCommand(this.buttonList),
      'ArrowDown': () => new MenuSelectDownCommand(this.buttonList),
    }, this.game.keyboard, this.commandInvoker)
    
    this.game.screen.root.addChild(this.ui)

    this.addEventListener(StateEventTypes.STATE_STARTED, () => {
      this.game.screen.root.addChild(this.ui)
    })
    this.addEventListener(StateEventTypes.STATE_ENDED, () => {
      this.game.screen.root.removeById(this.ui.id)
    })
  }

  update(_elapsed: number, _delta: number): void {
    this.inputMapper.update()
    this.commandInvoker.update()
    this.selection.text = 'Selection: ' + this.buttonList.selectedItem
  }
}

export default MainMenuState
