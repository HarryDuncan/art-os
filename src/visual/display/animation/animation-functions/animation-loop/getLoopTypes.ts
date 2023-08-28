import { ANIMATION_LOOP_TYPES } from "./animationLoop.consts";
import { AnimationLoopConfig } from "./animationloop.types";

export const getLoopType = (config: AnimationLoopConfig) => {
  const { duration, steepness, loopType } = config;
  const animationSteepness = steepness ?? 1;
  switch (loopType) {
    case ANIMATION_LOOP_TYPES.ONE_TO_ONE:
      return (time: number) =>
        (Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5) **
        animationSteepness;
    case ANIMATION_LOOP_TYPES.ZERO_TO_ZERO:
      return (time: number) =>
        ((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5) **
        animationSteepness;
    case ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
      return (time: number) => time / duration / duration;
  }
};
