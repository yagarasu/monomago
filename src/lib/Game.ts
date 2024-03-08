import { AwilixContainer, Lifetime, LifetimeType, asClass, asFunction, createContainer } from "awilix"
import { GameOptions, SceneInstanceMode, SceneRegister } from "./types"
import SceneManager from "./SceneManager"
import ComponentHandler from "./components/handlers/ComponentHandler"
import ScreenComponentHandler from "./components/handlers/ScreenComponentHandler"
import Screen from "./Screen"

export const gameOptionsDefault: GameOptions = {
  width: 720,
  height: 480,
  fps: 60,
}

class Game extends EventTarget {
  private el: HTMLElement
  private options: GameOptions
  private running: boolean = false
  private timer?: number
  private lastTick?: DOMHighResTimeStamp
  private container: AwilixContainer

  constructor(el: HTMLElement, sceneRegister: SceneRegister = {}, options: Partial<GameOptions> = {}) {
    super()
    this.el = el
    this.options = {
      width: options.width ?? gameOptionsDefault.width,
      height: options.height ?? gameOptionsDefault.height,
      fps: options.fps ?? gameOptionsDefault.fps,
    }
    this.container = createContainer()
    this.registerServices()
    this.registerScenes(sceneRegister)
  }

  registerServices() {
    this.container.register({
      'Screen': asFunction(() => new Screen(this.el, { width: 720, height: 480 }), { lifetime: Lifetime.SINGLETON }),
      'SceneManager': asClass(SceneManager, { lifetime: Lifetime.SINGLETON }),
      'ComponentHandler': asClass(ComponentHandler, { lifetime: Lifetime.SINGLETON }),
    })

    this.container.register({
      'ScreenComponentHandler': asClass(ScreenComponentHandler, { lifetime: Lifetime.SINGLETON }),
    })
  }

  registerScenes(sceneRegister: SceneRegister) {
    const registration = Object.keys(sceneRegister).reduce((acc, name) => {
      const { sceneFactory, mode } = sceneRegister[name]
      const modeToLifetimeMap: Record<SceneInstanceMode, LifetimeType> = {
        'INSTANCE': Lifetime.TRANSIENT,
        'SINGLETON': Lifetime.SINGLETON,
      }
      return {
        ...acc,
        [name + '-scene']: asFunction(sceneFactory, { lifetime: modeToLifetimeMap[mode] })
      }
    }, {})
    this.container.register(registration)
  }

  run(initialScene: string) {
    if (this.running) throw new Error('Game is already running')
    if (initialScene) {
      const scene = this.container.resolve(initialScene + '-scene')
      const sm = this.container.resolve('SceneManager')
      sm.push(scene)
    }
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
    const sm = this.container.resolve('SceneManager')
    if (!sm.scene) return
    sm.scene.update(elapsed, delta)
    const ch = this.container.resolve('ComponentHandler')
    ch.update(elapsed, delta, sm.scene.children)
    // this.tweenManager.update(elapsed)
    // this.screen.render()
  }
}

export default Game
