import Element from "./Element"

class Scene {
  children: Element[] = []
  
  setup() {}
  update(_elapsed: number, _delta: number) {}
  teardown() {}
  pause() {}
  resume() {}
}

export default Scene
