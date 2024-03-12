import Screen from "../../Screen";
import { Cradle } from "../../types";

export interface ScreenComponent {
  position: { x: number, y: number }
  render(context: CanvasRenderingContext2D): void
}

class ScreenComponentHandler {
  screen: Screen

  constructor({ Screen }: Cradle) {
    this.screen = Screen
  }
  
  handle(component: ScreenComponent) {
    component.render(this.screen.context)
  }
}

export default ScreenComponentHandler
