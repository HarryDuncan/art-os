import {
  AnimationConfig,
  ANIMATION_TYPES,
  TraversalAnimationConfig,
} from "./animation.types";
import { calculateCurve } from "./traversal/calculateBeizier";

export const setUpAnimationConfig = (animationConfig: AnimationConfig) => {
  const { animationProperties } = animationConfig;
  switch (animationConfig.animationType) {
    case ANIMATION_TYPES.TRAVERSE: {
      const {
        startPosition,
        endPosition,
        curveSize,
      } = animationProperties as TraversalAnimationConfig;
      const curve = calculateCurve(startPosition, endPosition, curveSize);
      return {
        ...animationConfig,
        animationProperties: { ...animationProperties, curve },
      };
    }
    default: {
      return animationConfig;
    }
  }
};
