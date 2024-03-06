export const StateEventTypes = {
  STATE_STARTED: 'statestarted',
  STATE_ENDED: 'stateended',
  STATE_PUSHED: 'statepushed',
  STATE_POPPED: 'statepopped',
  STATE_PAUSED: 'statepaused',
  STATE_RESUMED: 'stateresumed',
}

class StateEvent extends Event {
  data?: Record<string, unknown>

  constructor(type: string, data?: Record<string, unknown>, options?: EventInit) {
    super(type, options)
    this.data = data
  }
}

export default StateEvent
