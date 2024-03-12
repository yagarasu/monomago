import Throttle from "../Throttle";
import Vector from "../math/Vector";
import { CommandCreator, DisppatchCallback } from "../types";
import Keyboard from "./Keyboard";

type VectorMap = Record<string, Vector>

class DirectionalMapper {
  private vectorMap
  private keyboard
  private throttleManager: Throttle
  private commandCreator: CommandCreator
  private dispatchCallback: DisppatchCallback

  private _throttleTime: number = 200

  get throttle() {
    return this._throttleTime
  }

  constructor(
    vectorMap: VectorMap,
    keyboard: Keyboard,
    throttle: Throttle,
    throttleTime: number,
    commandCreator: CommandCreator,
    dispatchCallback: DisppatchCallback
  ) {
    this.vectorMap = vectorMap
    this.keyboard = keyboard
    this.throttleManager = throttle,
    this._throttleTime = throttleTime
    this.commandCreator = commandCreator
    this.dispatchCallback = dispatchCallback

    throttle.throttleFunction('handleMove', this._throttleTime, (vector: Vector) => {
      const command = this.commandCreator(vector)
      this.dispatchCallback(command)
    })
  }

  getVector() {
    const vector = new Vector(0, 0)
    for (const key in this.vectorMap) {
      if (this.keyboard.isKeyPressed(key) && Object.prototype.hasOwnProperty.call(this.vectorMap, key)) {
        const keyVector = this.vectorMap[key];
        vector.add(keyVector)
      }
    }
    vector.normalize()
    return vector
  }

  update() {
    const vector = this.getVector()
    if (vector.magnitude > 0) {
      this.throttleManager.call('handleMove', vector)
    }
  }
}

export default DirectionalMapper
