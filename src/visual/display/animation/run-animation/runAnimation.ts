import {
  AnimatedScene,
  AnimationConfig,
  AnimationFunctionType,
  AnimationProperties,
} from "../animation.types";
import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { getSceneElementByName } from "visual/display/helpers/scene/getSceneElementByName";
import { updateUTime } from "./run-functions/updateUTime";
import { chainAnimation } from "./run-functions/chainAnimation";
import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";

export const runAnimation = (
  scene: AnimatedScene,
  animationFunctionType: AnimationFunctionType,
  targetIdentifier: string,
  animationProperties: AnimationProperties,
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
      chainAnimation(animationProperties, animatedObjects);
      break;
    case ANIMATION_FUNCTION_TYPES.UTIME:
      updateUTime(
        scene,
        animationProperties,
        animatedObjects as ShaderMeshObject[]
      );
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(animationProperties, animatedObjects);
  }
};
