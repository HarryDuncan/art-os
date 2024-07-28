import { ANIMATION_LOOP_TYPES } from "./animationLoop.consts";

export type AnimationLoopType = keyof typeof ANIMATION_LOOP_TYPES;
export interface AnimationLoopConfigItem {
  loopType: AnimationLoopType;
  uniform: string;
  toMaterial?: string;
  duration?: number;
  loopProps: Partial<LoopProps>;
}

export type TransitionLoopConfig = {
  transitionAnimations: AnimationLoopConfigItem[];
  transitionDuration: number;
};

export type AnimationLoopKeyPoint = {
  start: number;
  end: number;
};

export interface LoopProps {
  steepness: number;
  loopLimit: number;
  maxPeak: number;
  minTrough: number;
  speed: number;
}

interface BaseLoopProps {
  peak: number;
  trough: number;
}
export type FlickerLoopProps = BaseLoopProps & {
  flickerTimeAtMax: number;
  flickerType: string;
};

export type AnimationLoopProps = FlickerLoopProps;
