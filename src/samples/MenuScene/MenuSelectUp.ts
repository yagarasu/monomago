import { Command } from "../../lib/types";
import Menu from "./Menu";

class MenuSelectUp implements Command {
  private menu: Menu

  constructor(menu: Menu) {
    this.menu = menu
  }

  execute() {
    const current = this.menu.selected
    const newValue = current - 1 >= 0 ? current - 1 : this.menu.itemsCount - 1
    this.menu.selected = newValue
  };
}

export default MenuSelectUp
