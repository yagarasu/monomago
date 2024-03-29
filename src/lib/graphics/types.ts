import Vector from "../math/Vector"

export type Rect = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export interface Positionable {
  x: number
  y: number
  position: Vector
}

export interface Renderable {
  render: (ctx: CanvasRenderingContext2D) => void
}

export type AnimationDefinition = {
  indices: number[],
  durations: number[] | number,
}
