import Vector from '../math/Vector'

class Keyboard {
  keys: Record<string, true> = {}
  bufferSize = 5
  buffer: string[] = []
  bufferTimeout: number = 300
  bufferTimeoutId?: number

  constructor() {
    window.addEventListener('keydown', this._onKeyDown.bind(this))
    window.addEventListener('keyup', this._onKeyUp.bind(this))
  }

  _onKeyDown(e: KeyboardEvent) {
    this.keys[e.key] = true
  }

  _onKeyUp(e: KeyboardEvent) {
    delete this.keys[e.key]
    this.buffer.push(e.key)
    if (this.buffer.length > this.bufferSize) this.buffer.shift()
    if (this.bufferTimeoutId) {
      clearTimeout(this.bufferTimeoutId)
    }
    this.bufferTimeoutId = setTimeout(() => {
      this.buffer = []
      this.bufferTimeoutId = undefined
    }, this.bufferTimeout)
  }

  comboMatches(combo: string[]) {
    if (combo.length > this.bufferSize) throw new Error('Combo match bigger than buffer')
    if (combo.length === this.bufferSize) {
      return combo.join('::') === this.buffer.join('::')
    }
    const subbuffer = this.buffer.slice(combo.length * -1)
    return combo.join('::') === subbuffer.join('::')
  }

  isKeyPressed(key: string) {
    return this.keys[key]
  }

  getDirectionVector() {
    let x = 0, y = 0
    if (this.isKeyPressed('ArrowLeft')) x--
    if (this.isKeyPressed('ArrowRight')) x++
    if (this.isKeyPressed('ArrowUp')) y--
    if (this.isKeyPressed('ArrowDown')) y++
    const v = new Vector(x, y)
    v.normalize()
    return v
  }
}

export default Keyboard
