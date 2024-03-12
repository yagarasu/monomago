import { v4 as uuid } from "uuid"
import { Component } from "./types"

class Element {
  id: string
  components: Component[]

  constructor(components: Component[] = []) {
    this.id = uuid()
    this.components = components
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  setComponents(components: Component[]) {
    this.components = components
  }
}

export default Element
