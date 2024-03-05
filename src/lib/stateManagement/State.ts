import Game from "../Game"

class State extends EventTarget {
  game: Game

  constructor(game: Game) {
    super()
    this.game = game
  }

  update(_ts: DOMHighResTimeStamp, _delta: number) {}
}

export default State
