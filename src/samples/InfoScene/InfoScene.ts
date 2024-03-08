import Element from "../../lib/Element";
import Scene from "../../lib/Scene";
import RectComponent from "../../lib/components/RectComponent";

class InfoScene extends Scene {
  constructor() {
    super()
    this.children = [
      new Element([
        new RectComponent(10, 10, 50, 50)
      ])
    ]
  }
  update() {
    // console.log('>> update')
  }
  setup() {
    console.log('>> setup')
  }
  teardown() {
    console.log('>> teardown')
  }
  pause() {
    console.log('>> pause')
  }
  resume() {
    console.log('>> resume')
  }
}

export const infoSceneFactory = () => new InfoScene()

export default InfoScene
