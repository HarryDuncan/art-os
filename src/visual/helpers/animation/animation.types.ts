import { Vector3 } from "three";
import { AXIS } from "../three-dimension-space/position/position.types";
import {
  OBJECT_UPDATE_PROPERTY,
  TRIGONOMETRIC_TYPES,
} from "./animation.constants";

export const ANIMATION_TYPES = {
  ROTATE: "ROTATE",
  SPIN: "SPIN",
  TRAVERSE: "TRAVERSE",
  TRIG: "TRIG",
};
export type AnimationType = keyof typeof ANIMATION_TYPES;
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

export interface TraversalAnimationConfig extends AnimationPropertiesConfig {
  startPosition: Vector3;
  endPosition: Vector3;
  curveSize: number;
  curve?: any;
}

export type TrigonometricType = keyof typeof TRIGONOMETRIC_TYPES;
export type ObjectUpdateProperty = keyof typeof OBJECT_UPDATE_PROPERTY;
export interface TrigonometricAnimationConfig
  extends AnimationPropertiesConfig {
  type: TrigonometricType;
  objectUpdateProperty: ObjectUpdateProperty;
}

export type AnimationProperties =
  | RotationAnimationConfig
  | SpinAnimationConfig
  | TraversalAnimationConfig;

export interface AnimationConfig {
  animationType: AnimationType;
  animationProperties: AnimationProperties;
}
