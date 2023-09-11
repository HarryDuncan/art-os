import { ANIMATION_LOOP_TYPES } from "../../animation-loop/animationLoop.consts";

export type AnimationLoopType = keyof typeof ANIMATION_LOOP_TYPES;
export interface AnimationLoopConfigItem {
  loopType: AnimationLoopType;
  uniform: string;
  duration?: number;
  steepness?: number;
  toMaterial?: string;
}
