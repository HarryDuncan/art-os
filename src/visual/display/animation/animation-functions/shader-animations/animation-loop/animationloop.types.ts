import { ANIMATION_LOOP_TYPES } from "./animationLoop.consts";

export type AnimationLoopType = keyof typeof ANIMATION_LOOP_TYPES;
export interface AnimationLoopConfigItem {
  loopType: AnimationLoopType;
  uniform: string;
  duration?: number;
  steepness?: number;
  toMaterial?: string;
  loopLimit?: number;
}

export type AnimationLoopKeyPoint = {
  start: number;
  end: number;
};
