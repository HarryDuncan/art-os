import { Camera } from "three";
import { AnimationConfig, AnimationFunctionType } from "../animation.types";
import { chainAnimation } from "./chainAnimation";
import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { animateAll } from "./animateAll";

export const runCameraAnimation = (
  camera: Camera,
  animationFunctionType: AnimationFunctionType,
  initializedAnimationConfig: AnimationConfig
) => {
  console.log("acas");
  switch (animationFunctionType) {
    case ANIMATION_FUNCTION_TYPES.CHAIN:
      chainAnimation(initializedAnimationConfig, [camera]);
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(initializedAnimationConfig, [camera]);
  }
};
