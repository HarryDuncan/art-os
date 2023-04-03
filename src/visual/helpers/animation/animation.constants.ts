import { AXIS } from "../three-dimension-space/position/position.types";
import { ANIMATION_TYPES } from "./animation.types";

export const DEFAULT_ROTATION_CONFIG = {
  animationType: ANIMATION_TYPES.ROTATE,
  animationProperties: {
    animationDurationMilis: 700,
    animationPauseMilis: 100,
    repeatAnimation: true,
    rotationAxis: AXIS.Z,
  },
};

export const DEFAULT_SPIN_CONFIG = {
  animationType: ANIMATION_TYPES.SPIN,
  animationProperties: {
    rotationAxis: AXIS.Y,
    speed: 0.009,
    animationDurationMilis: 2000,
    animationPauseMilis: 10,
    repeatAnimation: true,
  },
};

export const TRIGONOMETRIC_TYPES = {
  COS: "cos",
  SIN: "sin",
  TAN: "tan",
};

export const OBJECT_UPDATE_PROPERTY = {
  POSITION: "position",
  ROTATION: "rotation",
};
