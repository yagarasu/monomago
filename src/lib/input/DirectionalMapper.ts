import Vector from "../math/Vector";
import Keyboard from "./Keyboard";

type VectorMap = Record<string, Vector>

class DirectionalMapper {
  #vectorMap
  #keyboard

  constructor(vectorMap: VectorMap, keyboard: Keyboard) {
    this.#vectorMap = vectorMap
    this.#keyboard = keyboard
  }

  getVector() {
    const vector = new Vector(0, 0)
    for (const key in this.#vectorMap) {
      if (this.#keyboard.isKeyPressed(key) && Object.prototype.hasOwnProperty.call(this.#vectorMap, key)) {
        const keyVector = this.#vectorMap[key];
        vector.add(keyVector)
      }
    }
    vector.normalize()
    return vector
  }
}

export default DirectionalMapper
