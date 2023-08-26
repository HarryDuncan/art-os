import { AnimationConfig, AnimationFunctionType } from "../animation.types";
import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { getSceneElementByName } from "visual/display/helpers/scene/getSceneElementByName";
import { updateUTime } from "./run-functions/updateUTime";
import { chainAnimation } from "./run-functions/chainAnimation";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const runAnimation = (
  scene: InteractiveScene,
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
    case ANIMATION_FUNCTION_TYPES.UTIME:
      console.log("asdasd");
      updateUTime(scene, initializedAnimationConfig, animatedObjects);
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(initializedAnimationConfig, animatedObjects);
  }
};
