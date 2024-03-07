class Throttle {
  _throttledFunctions = new Map<string, CallableFunction>()

  throttleFunction(id: string, throttleTime: number, fn: CallableFunction) {
    let lastCall: number | undefined
    const handler = (...args: unknown[]) => {
      const now = Date.now()
      if (lastCall !== undefined && now < (lastCall + throttleTime)) return
      fn(...args)
      lastCall = now
    }
    this._throttledFunctions.set(id, handler)
  }

  unthrottleFunction(id: string) {
    this._throttledFunctions.delete(id)
  }
  
  getHandler(id: string) {
    return this._throttledFunctions.get(id)
  }

  call(id: string, ...args: unknown[]) {
    const fn = this.getHandler(id)
    if (fn) fn(...args)
  }
}

export default new Throttle()
