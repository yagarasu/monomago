import { Rect } from "./types"

class AtlasMaker {
  static atlasFromGrid(cols: number, rows: number, tileWidth: number, tileHeight: number) {
    const items: Rect[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        items.push({ x: tileWidth * col, y: tileHeight * row, width: tileWidth, height: tileHeight })
      }
    }
    return items
  }
}

export default AtlasMaker
