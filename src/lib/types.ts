import Scene from "./Scene"
import Vector from "./math/Vector"

export type Cradle = any

export type GameOptions = {
  width: number
  height: number
  fps: number
}

export type SceneFactory = (cradle: any) => Scene
export type SceneInstanceMode = 'INSTANCE' | 'SINGLETON'
export type SceneRegistration = {
  sceneFactory: SceneFactory,
  mode: SceneInstanceMode,
}
export type SceneRegister = Record<string, SceneRegistration>

export interface Component {
  handler: string
}

export type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type AnimationDefinition = {
  indices: number[],
  durations: number[] | number,
}

export interface Command {
  type: string
  execute: (elapsed: number, delta: number) => void
}
export type CommandCreator = (...args: any[]) => Command
export type CommandCreatorMap = Record<string, CommandCreator>
export type DisppatchCallback = (command: Command) => void
export type VectorMap = Record<string, Vector>
export type SequenceMap = Record<string, string[]>