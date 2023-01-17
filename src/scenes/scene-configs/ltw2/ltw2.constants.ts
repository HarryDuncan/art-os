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
