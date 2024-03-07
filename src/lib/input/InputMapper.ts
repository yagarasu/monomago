import CommandInvoker from "../CommandInvoker";
import Throttle from "../Throttle";
import { Command, Updatable } from "../types";
import Keyboard from "./Keyboard";

type CommandCreator = () => Command
type CommandCreatorMap = Record<string, CommandCreator>

class InputMapper implements Updatable {
  _map: CommandCreatorMap
  _keyboard: Keyboard
  _commandInvoker: CommandInvoker
  _throttle: number

  constructor(commandCreatorMap: CommandCreatorMap = {}, keyboard: Keyboard, commandInvoker: CommandInvoker, throttle: number = 0) {
    this._map = commandCreatorMap
    this._keyboard = keyboard
    this._commandInvoker = commandInvoker
    this._throttle = throttle
    Throttle.throttleFunction('enqueueCommand', 150, (key: string) => {
      const commandCreator = this._map[key]
      this._commandInvoker.enqueue(commandCreator())
    })
  }

  update() {
    for (const key in this._map) {
      if (this._keyboard.isKeyPressed(key) && Object.prototype.hasOwnProperty.call(this._map, key)) {
        Throttle.call('enqueueCommand', key)
      }
    }
  }
}

export default InputMapper
