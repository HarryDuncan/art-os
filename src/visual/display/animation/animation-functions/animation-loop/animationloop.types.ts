import { ANIMATION_LOOP_TYPES } from "./animationLoop.consts";

export type AnimationLoopType = keyof typeof ANIMATION_LOOP_TYPES;
export interface AnimationLoopConfig {
  loopType: AnimationLoopType;
  duration: number;
  steepness?: number;
}
