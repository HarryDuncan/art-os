import { positionConfigToVector3 } from "visual/helpers/conversion/positionConfigToVector3";
import { calculateCurve } from "../animation-functions/traversal/calculateBeizier";
import { ANIMATION_TYPES } from "../animation.constants";
import { AnimationConfig, TraversalAnimationConfig } from "../animation.types";
import { DEFAULT_ANIMATION_DURATION_MILIS } from "../animation.defaults";

export const setUpAnimationConfig = (animationConfig: AnimationConfig) => {
  const { animationProperties } = animationConfig;
  switch (animationConfig.animationType) {
    case ANIMATION_TYPES.TRAVERSE: {
      const {
        startPosition,
        endPosition,
        curveSize,
        animationDurationMilis,
      } = animationProperties as TraversalAnimationConfig;
      const curveStart = positionConfigToVector3(startPosition);
      const curveEnd = positionConfigToVector3(endPosition);
      const curve = calculateCurve(curveStart, curveEnd, curveSize);
      return {
        ...animationConfig,
        animationProperties: {
          ...animationProperties,
          startPosition: curveStart,
          endPosition: curveEnd,
          animationDurationMilis:
            animationDurationMilis ?? DEFAULT_ANIMATION_DURATION_MILIS,
          curve,
        },
      };
    }
    default: {
      return animationConfig;
    }
  }
};