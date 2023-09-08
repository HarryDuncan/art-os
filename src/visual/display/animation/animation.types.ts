import { Clock, Scene, Vector3 } from "three";
import {
  ANIMATION_FUNCTION_TYPES,
  ANIMATION_TYPES,
  OBJECT_UPDATE_PROPERTY,
  TRIG_FUNCTION_TYPES,
} from "./animation.constants";
import { Axis } from "../helpers/three-dimension-space/position/position.types";

// to avoid dependency cycle
export type AnimatedScene = Scene & {
  clock: Clock;
};

export type CustomAnimationConfig = {
  animationId: string;
  animationFunctionType: AnimationFunctionType;
  targetIdentifier: string;
  animationProperties: AnimationProperties;
  isRunning?: boolean;
};

export interface AnimationPropertiesConfig {
  animationType: AnimationType;
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
  curve?: Vector3[];
}

export type FallAnimationConfig = AnimationPropertiesConfig;

export type TrigFunctionType = keyof typeof TRIG_FUNCTION_TYPES;
export type ObjectUpdateProperty = keyof typeof OBJECT_UPDATE_PROPERTY;
export type AnimationFunctionType = keyof typeof ANIMATION_FUNCTION_TYPES;

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

export type AnimationType = keyof typeof ANIMATION_TYPES;
