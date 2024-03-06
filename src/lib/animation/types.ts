export type TweenableProperties<T> = Partial<Omit<T, { [K in keyof T]-?: T[K] extends number ? never : K }[keyof T]>>
export type TweenableCurrentValues<T> = { [key in keyof T]?: number }