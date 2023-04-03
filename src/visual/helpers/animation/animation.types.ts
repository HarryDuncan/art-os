import { Vector3 } from "three";
import { Axis } from "../three-dimension-space/position/position.types";
import {
  OBJECT_UPDATE_PROPERTY,
  TRIG_FUNCTION_TYPES,
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
  rotationAxis: Axis;
  speed: number;
}
export interface RotationAnimationConfig extends AnimationPropertiesConfig {
  rotationAxis: Axis;
}

export interface TraversalAnimationConfig extends AnimationPropertiesConfig {
  startPosition: Vector3;
  endPosition: Vector3;
  curveSize: number;
  curve?: any;
}

export type TrigFunctionType = keyof typeof TRIG_FUNCTION_TYPES;
export type ObjectUpdateProperty = keyof typeof OBJECT_UPDATE_PROPERTY;

export interface TrigonometricAnimationConfig
  extends AnimationPropertiesConfig {
  trigFunctionType: TrigFunctionType;
  objectUpdateProperty: ObjectUpdateProperty;
}

export type AnimationProperties =
  | RotationAnimationConfig
  | SpinAnimationConfig
  | TraversalAnimationConfig
  | TrigonometricAnimationConfig;

export interface AnimationConfig {
  animationType: AnimationType;
  animationProperties: AnimationProperties;
}
