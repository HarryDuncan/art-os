import { AXIS } from "../three-dimension-space/position/position.types";

export enum ANIMATION_TYPES {
  ROTATE = "ROTATE",
}

export interface AnimationPropertiesConfig {
  animationDurationMilis: number;
  animationPauseMilis: number;
  repeatAnimation: boolean;
}

export interface RotationAnimationConfig extends AnimationPropertiesConfig {
  rotationAxis: AXIS;
}

export type AnimationProperties = RotationAnimationConfig;

export interface AnimationConfig {
  animationType: ANIMATION_TYPES;
  animationProperties: AnimationProperties;
}
