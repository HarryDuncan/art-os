export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export const easeOut = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
