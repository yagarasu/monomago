import ScreenElement from "./ScreenElement";

class Paragraph extends ScreenElement {
  #text: string = ''
  words: string[] = []
  width: number = 100
  lineHeight: number = 16 + 8
  fill: string = '#ffffff'
  font: string = '16px monospace'

  constructor(text: string = '') {
    super()
    this.#text = text
    this.calculateWords()
  }

  set text(text: string) {
    this.#text = text
    this.calculateWords()
  }

  calculateWords() {
    this.words = this.#text.split(' ')
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.fillStyle = this.fill
    ctx.font = this.font
    ctx.textBaseline = 'hanging'
    let line = ''
    let dy = 0
    for (let n = 0; n < this.words.length; n++) {
      const word = this.words[n];
      const testLine = line !== '' ? [line, word].join(' ') : word
      const measurements = ctx.measureText(testLine)
      const { width } = measurements
      if (width > this.width && n > 0) {
        ctx.fillText(line, 0, dy)
        line = word
        dy += this.lineHeight
      } else {
        line = testLine
      }
      ctx.fillText(line, 0, dy)
    }
    ctx.restore()
  }
}

export default Paragraph
