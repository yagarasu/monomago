export function linear(a: number, b: number, t: number) {
  return a + ((b - a) * t)
}

export function easeOutElastic (min: number, max: number, a: number) {
  const c4 = (2 * Math.PI) / 3;
  const i = a === 0
    ? 0
    : a === 1
      ? 1
      : Math.pow(2, -10 * a) * Math.sin((a * 10 - 0.75) * c4) + 1;
  return min + ((max - min) * i);
}
