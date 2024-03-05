import State from "./State"
import StateEvent, { StateEventTypes } from "./StateEvent"

class StateManager {
  states: State[] = []

  get state() {
    const state = this.states[this.states.length - 1]
    return state
  }

  push(state: State) {
    this.states.push(state)
    state.dispatchEvent(new StateEvent(StateEventTypes.STATE_PUSHED))
  }

  pop() {
    const state = this.states.pop()
    state?.dispatchEvent(new StateEvent(StateEventTypes.STATE_POPPED))
    this.state?.dispatchEvent(new StateEvent(StateEventTypes.STATE_RESUMED))
  }
}

export default StateManager
