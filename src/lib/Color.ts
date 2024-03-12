class Color {
  red: number = 0
  green: number = 0
  blue: number = 0
  alpha: number = 1

  constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 1) {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }

  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }
}

export default Color
