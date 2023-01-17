import { ANIMATION_TYPES } from "visual/helpers/animation/animation.types";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const LOGO_ANIMATION_CONFIG = {
  animationType: ANIMATION_TYPES.ROTATE,
  animationProperties: {
    animationDurationMilis: 2000,
    animationPauseMilis: 1000,
    repeatAnimation: true,
    rotationAxis: AXIS.Z,
  },
};
