import { Command } from "../../lib/types";
import ButtonList from "./ButtonList";

class MenuSelectUpCommand implements Command {
  buttonList

  constructor(buttonList: ButtonList) {
    this.buttonList = buttonList
  }

  execute() {
    console.log('Menu up')
    if (this.buttonList.selectedItem >= 1) this.buttonList.selectedItem--
  }
}

export default MenuSelectUpCommand
