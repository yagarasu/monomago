import Scene from "./Scene"

export type Cradle = any

export type GameOptions = {
  width: number
  height: number
  fps: number
}

export type SceneFactory = (...deps: unknown[]) => Scene
export type SceneInstanceMode = 'INSTANCE' | 'SINGLETON'
export type SceneRegistration = {
  sceneFactory: SceneFactory,
  mode: SceneInstanceMode,
}
export type SceneRegister = Record<string, SceneRegistration>

export interface Component {
  handler: string
}
