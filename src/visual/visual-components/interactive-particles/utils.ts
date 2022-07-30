export const easeOutSine = (t: number, b: number, c: number, d: number) =>
  c * Math.sin((t / d) * (Math.PI / 2)) + b;
