import Element from "../../lib/Element";
import Scene from "../../lib/Scene";
import ParagraphComponent from "../../lib/components/screenComponents/ParagraphComponent";
import Keyboard from "../../lib/input/Keyboard";

type InfoSceneDependencies = {
  Keyboard: Keyboard,
}

class InfoScene extends Scene {
  keyboard: Keyboard

  constructor({ Keyboard }: InfoSceneDependencies) {
    super()
    this.keyboard = Keyboard
    this.children = [
      new Element([
        (new ParagraphComponent('This is a demo proyect to showcase the features that Monomago provides.'))
      ])
    ]
  }

  update(_elapsed: number, _delta: number) {
    if (this.keyboard.isKeyPressed('Escape')) {
      console.log('>> update')
    }
  }
}

export const infoSceneFactory = (cradle: any) => new InfoScene(cradle)

export default InfoScene
