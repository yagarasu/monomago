import { Command } from "../../lib/types";
import ButtonList from "./ButtonList";

class MenuSelectDownCommand implements Command {
  buttonList

  constructor(buttonList: ButtonList) {
    this.buttonList = buttonList
  }

  execute() {
    console.log('Menu down')
    if (this.buttonList.selectedItem < this.buttonList.maxItemIndex) this.buttonList.selectedItem++
  }
}

export default MenuSelectDownCommand
