import { Command } from "../../lib/types";
import Menu from "./Menu";

class MenuSelectDown implements Command {
  private menu: Menu

  constructor(menu: Menu) {
    this.menu = menu
  }

  execute() {
    const current = this.menu.selected
    const newValue = current + 1 < this.menu.itemsCount ? current + 1 : 0
    this.menu.selected = newValue
  };
}

export default MenuSelectDown
