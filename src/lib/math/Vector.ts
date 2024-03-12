class Vector {
  x: number = 0
  y: number = 0

  static vectorFromPositionable(object: { x: number, y: number }) {
    return new Vector(object.x, object.y)
  }

  static zeroVector() {
    return new Vector(0, 0)
  }

  static upVector() {
    return new Vector(0, -1)
  }

  static downVector() {
    return new Vector(0, 1)
  }

  static leftVector() {
    return new Vector(-1, 0)
  }

  static rightVector() {
    return new Vector(1, 0)
  }

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  get magnitude() {
    return Math.abs(Math.sqrt((this.x * this.x) + (this.y * this.y)))
  }

  set magnitude(magnitude: number) {
    const rad = this.direction
    this.x = Math.cos(rad) * magnitude;
    this.y = Math.sin(rad) * magnitude;
  }

  get direction() {
    return Math.atan2(this.y, this.x);
  }

  set direction(rad: number) {
    const magnitude = this.magnitude
    this.x = Math.cos(rad) * magnitude;
    this.y = Math.sin(rad) * magnitude;
  }

  add(v: Vector) {
    this.x += v.x
    this.y += v.y
    return this
  }

  multiplyScalar(s: number) {
    this.x *= s
    this.y *= s
    return this
  }

  normalize() {
    if (this.magnitude === 0) return this
    const rad = this.direction
    this.x = Math.cos(rad)
    this.y = Math.sin(rad)
    return this
  }

  applyVectorToPositionable(object: { x: number, y: number }) {
    object.x = this.x
    object.y = this.y
  }

  toArray() {
    return [this.x, this.y]
  }

  toObject() {
    return { x: this.x, y: this.y }
  }

  clone() {
    return new Vector(this.x, this.y)
  }
}

export default Vector
