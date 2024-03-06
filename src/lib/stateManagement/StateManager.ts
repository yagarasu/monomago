import State from "./State"
import StateEvent, { StateEventTypes } from "./StateEvent"

class StateManager {
  states: State[] = []

  get state() {
    const state = this.states[this.states.length - 1]
    return state
  }

  get stateIndex() {
    return this.states.length - 1
  }

  push(state: State) {
    this.state?.dispatchEvent(new StateEvent(StateEventTypes.STATE_PAUSED))
    this.states.push(state)
    state.dispatchEvent(new StateEvent(StateEventTypes.STATE_PUSHED))
    state.dispatchEvent(new StateEvent(StateEventTypes.STATE_STARTED))
  }

  pop() {
    const state = this.states.pop()
    state?.dispatchEvent(new StateEvent(StateEventTypes.STATE_POPPED))
    state?.dispatchEvent(new StateEvent(StateEventTypes.STATE_ENDED))
    this.state?.dispatchEvent(new StateEvent(StateEventTypes.STATE_RESUMED))
  }

  replace(state: State) {
    if (this.states.length === 0) {
      this.states.push(state)
    } else {
      const [removed] = this.states.splice(this.stateIndex, 1, state)
      removed.dispatchEvent(new StateEvent(StateEventTypes.STATE_ENDED))
    }
    state.dispatchEvent(new StateEvent(StateEventTypes.STATE_STARTED))
  }
}

export default StateManager
