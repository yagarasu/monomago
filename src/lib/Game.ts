import State from "./stateManagement/State"
import Screen from "./graphics/Screen"
import StateManager from "./stateManagement/StateManager"
import Keyboard from "./input/Keyboard"

export type GameOptions = {
  width: number
  height: number
  fps: number
}

export const gameOptionsDefault: GameOptions = {
  width: 720,
  height: 480,
  fps: 60,
}

class Game extends EventTarget {
  el: HTMLElement
  options: GameOptions
  screen: Screen
  stateManager: StateManager
  keyboard: Keyboard;
  running: boolean = false
  timer?: number
  lastTick?: DOMHighResTimeStamp

  constructor(el: HTMLElement, options: Partial<GameOptions> = {}) {
    super()
    this.el = el
    this.options = {
      width: options.width ?? gameOptionsDefault.width,
      height: options.height ?? gameOptionsDefault.height,
      fps: options.fps ?? gameOptionsDefault.fps,
    }
    this.screen = new Screen(this.el, {
      width: this.options.width,
      height: this.options.height,
    })
    this.stateManager = new StateManager()
    this.keyboard = new Keyboard()
  }

  run(initialState?: State) {
    if (this.running) throw new Error('Game is already running')
    if (initialState) this.stateManager.push(initialState)
    this.running = true
    this.timer = requestAnimationFrame(this.tick.bind(this))
  }

  stop() {
    if (this.timer) {
      cancelAnimationFrame(this.timer)
      this.timer = undefined
      this.lastTick = undefined
      this.running = false
    }
  }
  
  tick(ts: DOMHighResTimeStamp) {
    this.timer = requestAnimationFrame(this.tick.bind(this))
    if (!this.lastTick) this.lastTick = ts;
    const elapsed = ts - this.lastTick;
    this.lastTick = ts;
    const requiredElapsed = 1_000 / this.options.fps
    const delta = elapsed > 0 ? requiredElapsed / elapsed : 1;
    this.stateManager.state?.update(ts, delta)
    this.screen.render()
  }
}

export default Game;
