import Element from "../../Element";
import { Cradle } from "../../types";

class ComponentHandler {
  cradle: any

  constructor(cradle: Cradle) {
    this.cradle = cradle
  }

  update(elapsed: number, delta: number, elements: Element[]) {
    for (const element of elements) {
      const { components } = element
      for (const component of components) {
        const handlerName = component.handler
        const handler = this.cradle[handlerName]
        handler.handle(component, elapsed, delta)
      }
    }
  }
}

export default ComponentHandler
