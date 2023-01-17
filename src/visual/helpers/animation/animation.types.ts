import { AXIS } from "../three-dimension-space/position/position.types";

export enum ANIMATION_TYPES {
  ROTATE = "ROTATE",
  SPIN = "SPIN",
}

export interface AnimationPropertiesConfig {
  animationDurationMilis: number;
  repeatAnimation: boolean;
  animationPauseMilis: number;
}

export interface SpinAnimationConfig extends AnimationPropertiesConfig {
  rotationAxis: AXIS;
  speed: number;
}
export interface RotationAnimationConfig extends AnimationPropertiesConfig {
  rotationAxis: AXIS;
}

export type AnimationProperties = RotationAnimationConfig | SpinAnimationConfig;

export interface AnimationConfig {
  animationType: ANIMATION_TYPES;
  animationProperties: AnimationProperties;
}
