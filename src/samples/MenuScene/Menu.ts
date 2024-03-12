import Element from "../../lib/Element";
import LabelComponent from "../../lib/components/screenComponents/LabelComponent";

type MenuItem = {
  label: string,
}

class Menu extends Element {
  private _selected = 0
  private _items: MenuItem[]

  get selected() {
    return this._selected
  }

  set selected(v: number) {
    const prevComp = (this.components[this._selected]) as LabelComponent
    prevComp.position.x = 0
    this._selected = v
    const comp = (this.components[v]) as LabelComponent
    comp.position.x = 50
  }

  get itemsCount() {
    return this._items.length
  }
  
  constructor(items: MenuItem[]) {
    super()
    this._items = items
    this.components = items.map((item, i) => {
      return new LabelComponent(item.label, i === 0 ? 50 : 0, i * 30, 300)
    })
  }
}

export default Menu
