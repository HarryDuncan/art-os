import { Scene } from "three";
import { AnimationConfig, AnimationFunctionType } from "../animation.types";
import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { chainAnimation } from "./chainAnimation";
import { animateAll } from "./animateAll";
import { getSceneElementByName } from "visual/display/helpers/scene/getSceneElementByName";

export const runAnimation = (
  scene: Scene,
  animationFunctionType: AnimationFunctionType,
  targetIdentifier: string,
  initializedAnimationConfig: AnimationConfig,
  animationId: string
) => {
  const animatedObjects = getSceneElementByName(scene, targetIdentifier);
  if (!animatedObjects.length) {
    console.warn(
      `${animationId} can't run. No meshes selected with ${targetIdentifier}`
    );
    return;
  }
  switch (animationFunctionType) {
    case ANIMATION_FUNCTION_TYPES.CHAIN:
      chainAnimation(initializedAnimationConfig, animatedObjects);
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(initializedAnimationConfig, animatedObjects);
  }
};
