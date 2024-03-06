export const TweenEventTypes = {
  TWEEN_START: 'tweenstart',
  TWEEN_END: 'tweenend',
  TWEEN_CHANGE: 'tweenchange',
}

export class TweenEvent extends Event {
  data?: Record<string, unknown>

  constructor(type: string, data?: Record<string, unknown>, options?: EventInit) {
    super(type, options)
    this.data = data
  }
}