import { Camera, Object3D } from "three";
import { AnimationConfig, AnimationFunctionType } from "../animation.types";
import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { chainAnimation } from "./run-functions/chainAnimation";

export const runCameraAnimation = (
  camera: Camera,
  animationFunctionType: AnimationFunctionType,
  initializedAnimationConfig: AnimationConfig
) => {
  switch (animationFunctionType) {
    case ANIMATION_FUNCTION_TYPES.CHAIN:
      chainAnimation(initializedAnimationConfig, [camera]);
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(initializedAnimationConfig, [camera as Object3D]);
  }
};
