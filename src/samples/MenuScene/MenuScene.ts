import Scene from "../../lib/Scene";
import CommandManager from "../../lib/commands/CommandManager";
import InputMapper from "../../lib/input/InputMapper";
import InputMapperFactory from "../../lib/input/InputMapperFactory";
import { Command } from "../../lib/types";
import Menu from "./Menu";
import MenuSelectDown from "./MenuSelectDown";
import MenuSelectUp from "./MenuSelectUp";

type MenuSceneDependencies = {
  InputMapperFactory: InputMapperFactory,
  CommandManager: CommandManager,
}

class MenuScene extends Scene {
  private inputMapperFactory: InputMapperFactory
  private inputMapper: InputMapper
  private commandManager: CommandManager

  private menu: Menu = new Menu([
    { label: 'Sample 1' },
    { label: 'Info' },
  ])

  constructor({ InputMapperFactory, CommandManager }: MenuSceneDependencies) {
    super()
    this.inputMapperFactory = InputMapperFactory
    this.commandManager = CommandManager
    this.children = [
      this.menu
    ]
    this.inputMapper = this.inputMapperFactory.makeInputMapper({
      'ArrowUp': () => new MenuSelectUp(this.menu),
      'ArrowDown': () => new MenuSelectDown(this.menu),
    }, 250, (command: Command) => {
      this.commandManager.enqueue(command)
    })
  }

  update(elapsed: number, delta: number) {
    this.inputMapper.update()
    this.commandManager.update(elapsed, delta)
  }

  setup() { }

  teardown() { }
  pause() { }
  resume() { }
}

export const menuSceneFactory = (cradle: any) => new MenuScene(cradle)

export default MenuScene
