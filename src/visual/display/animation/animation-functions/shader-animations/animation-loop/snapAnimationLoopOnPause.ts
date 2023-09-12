import { ExtendedMesh } from "visual/set-up/config/mesh/mesh.types";
import { updateObjectUniformByKey } from "../uniforms/updateObjectUniformByKey";
import {
  ANIMATION_LOOP_KEYPOINTS,
  ANIMATION_LOOP_TYPES,
} from "./animationLoop.consts";
import { AnimationLoopConfigItem } from "./animationloop.types";

export const snapAnimationLoopOnPause = (
  config: AnimationLoopConfigItem[],
  animatedObject: ExtendedMesh
) => {
  config.forEach(({ loopType, uniform, toMaterial }) => {
    const loopKey = screamingSnakeToCamel(loopType);
    if (
      (toMaterial && animatedObject.material.name === toMaterial) ||
      !toMaterial
    ) {
      switch (loopType) {
        case ANIMATION_LOOP_TYPES.ONE_TO_ONE:
        case ANIMATION_LOOP_TYPES.ZERO_TO_ONE:
        case ANIMATION_LOOP_TYPES.ZERO_TO_ZERO:
          const uniformValue = ANIMATION_LOOP_KEYPOINTS[loopKey].end;
          updateObjectUniformByKey(animatedObject, uniform, uniformValue);
          break;
        default:
          break;
      }
    }
  });
};

function screamingSnakeToCamel(screamingSnake) {
  // Split the input string into words using underscores as separators
  const words = screamingSnake.toLowerCase().split("_");

  // Capitalize the first letter of each word except the first one
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].slice(1);
  }

  // Concatenate the words together without any spaces or underscores
  return words.join("");
}
