import Throttle from "../Throttle";
import { CommandCreatorMap, DisppatchCallback } from "../types";
import Keyboard from "./Keyboard";

class InputMapper {
  private map: CommandCreatorMap
  private keyboard: Keyboard
  private throttleManager: Throttle
  private dispatchCallback: DisppatchCallback

  private _throttleTime: number = 200

  get throttle() {
    return this._throttleTime
  }

  constructor(
    commandCreatorMap: CommandCreatorMap = {},
    keyboard: Keyboard,
    throttle: Throttle,
    throttleTime: number,
    dispatchCallback: DisppatchCallback
  ) {
    this.map = commandCreatorMap
    this.keyboard = keyboard
    this.throttleManager = throttle
    this._throttleTime = throttleTime
    this.dispatchCallback = dispatchCallback
    
    throttle.throttleFunction('handlePress', this._throttleTime, (key: string) => {
      const command = this.map[key]()
      this.dispatchCallback(command)
    })
  }

  update() {
    for (const key in this.map) {
      if (this.keyboard.isKeyPressed(key) && Object.prototype.hasOwnProperty.call(this.map, key)) {
        this.throttleManager.call('handlePress', key)
      }
    }
  }
}

export default InputMapper
