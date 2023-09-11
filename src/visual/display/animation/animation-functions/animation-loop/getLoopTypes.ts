import {
  ANIMATION_LOOP_TYPES,
  DEFAULT_DURATION_SECONDS,
  DEFAULT_STEEPNESS,
} from "./animationLoop.consts";

export const getLoopType = (
  loopType,
  duration = DEFAULT_DURATION_SECONDS,
  steepness = DEFAULT_STEEPNESS
) => {
  switch (loopType) {
    case ANIMATION_LOOP_TYPES.ONE_TO_ONE:
      return (time: number) =>
        (Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5) ** steepness;
    case ANIMATION_LOOP_TYPES.ZERO_TO_ZERO:
      return (time: number) =>
        ((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5) **
        steepness;
    case ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
    default:
      return (time: number) => time / duration / duration;
  }
};
