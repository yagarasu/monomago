import Scene from "../../lib/Scene";

class MenuScene extends Scene {
  constructor() {
    super()
  }
  update() {}
  setup() { }
  teardown() { }
  pause() { }
  resume() { }
}

export const menuSceneFactory = () => new MenuScene()

export default MenuScene
