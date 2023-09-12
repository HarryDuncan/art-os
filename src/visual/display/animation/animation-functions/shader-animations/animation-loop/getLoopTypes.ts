import {
  ANIMATION_LOOP_TYPES,
  DEFAULT_DURATION_SECONDS,
  DEFAULT_LOOP_LIMIT,
  DEFAULT_STEEPNESS,
} from "./animationLoop.consts";
import { AnimationLoopType } from "./animationloop.types";

export const getLoopType = (
  loopType: AnimationLoopType,
  duration = DEFAULT_DURATION_SECONDS,
  steepness = DEFAULT_STEEPNESS,
  loopLimit = DEFAULT_LOOP_LIMIT
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
      return (time: number) => (time % duration) / duration;
    case ANIMATION_LOOP_TYPES.COUNT:
      return (time: number) => {
        const loopCount = Math.floor(time / duration);
        return loopCount % loopLimit;
      };
    case ANIMATION_LOOP_TYPES.LINEAR:
    default:
      return (time: number) => time;
  }
};
