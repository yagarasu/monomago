import Scene from "./Scene"

class SceneManager {
  scenes: Scene[] = []

  get scene() {
    const scene = this.scenes[this.scenes.length - 1]
    return scene
  }

  get sceneIndex() {
    return this.scenes.length - 1
  }

  push(scene: Scene) {
    this.scene?.pause()
    this.scenes.push(scene)
    scene.setup()
  }

  pop() {
    const scene = this.scenes.pop()
    scene?.teardown()
    this.scene.resume()
  }

  replace(scene: Scene) {
    if (this.scenes.length === 0) {
      this.scenes.push(scene)
    } else {
      const [removed] = this.scenes.splice(this.sceneIndex, 1, scene)
      removed.teardown()
    }
    scene.setup()
  }
}

export default SceneManager
