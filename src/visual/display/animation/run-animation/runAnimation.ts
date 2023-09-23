import {
  AnimatedScene,
  AnimationConfig,
  ShaderAnimationConfig,
} from "../animation.types";
import { ANIMATION_FUNCTION_TYPES } from "../animation.constants";
import { animateAll } from "./run-functions/animateAll";
import { chainAnimation } from "./run-functions/chainAnimation";
import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";
import { runShaderAnimations } from "../animation-functions/shader-animations/runShaderAnimations";
import { getSceneElementByName } from "visual/utils/scene/getSceneElementByName";

export const runAnimation = (
  scene: AnimatedScene,
  animationConfig: AnimationConfig,
  animationId: string
) => {
  const {
    targetIdentifier,
    animationFunctionType,
    animationProperties,
  } = animationConfig;
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
      runShaderAnimations(
        scene,
        animationProperties as ShaderAnimationConfig,
        animatedObjects as ShaderMeshObject[]
      );
      break;
    case ANIMATION_FUNCTION_TYPES.ALL:
    default:
      animateAll(animationProperties, animatedObjects);
  }
};
