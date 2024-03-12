import TweenComponent from "../TweenComponent";

class TweenComponentHandler {
  handle(component: TweenComponent, elapsed: number, delta: number) {
    component.update(elapsed, delta)
  }
}

export default TweenComponentHandler
