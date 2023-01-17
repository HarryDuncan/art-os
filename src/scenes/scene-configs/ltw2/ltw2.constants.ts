import { ANIMATION_TYPES } from "visual/helpers/animation/animation.types";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const TEXT_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.ROTATE,
  animationProperties: {
    animationDurationMilis: 400,
    animationPauseMilis: 10,
    repeatAnimation: true,
    rotationAxis: AXIS.Y,
  },
};

export const MIRROR_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.SPIN,
  animationProperties: {
    speed: 0.005,
    rotationAxis: AXIS.Z,
    animationDurationMilis: -1,
    animationPauseMilis: -1,
    repeatAnimation: true,
  },
};

export const MIRROR_WIDTH = 4;
export const MIRROR_HEIGHT = 4;
export const TEXT_BBOX_SCHEMA = { height: 20, width: 10, depth: 0 };

export const CONFIG_INDEX = 4;
export const CONFIGS = [
  { text: "Harry J Dee", background: "blue-mag" },
  { text: "Marsh Long", background: "pinky-red" },
  { text: "Tommy Craig", background: "blue" },
  { text: "Grimmer", background: "orange-red" },
  { text: "Black Dave", background: "green" },
];
