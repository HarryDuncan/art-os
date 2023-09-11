import { ExtendedMesh } from "visual/set-up/config/mesh/mesh.types";
import { getLoopType } from "../../animation-loop/getLoopTypes";
import { updateObjectUniformByKey } from "../uniforms/updateObjectUniformByKey";
import { AnimationLoopConfigItem } from "./animationloop.types";

export const setUpAnimationLoopParams = (
  config: AnimationLoopConfigItem[],
  loopDuration?: number
): ((shaderMesh: ExtendedMesh, time: number) => [shaderMesh, time]) => {
  const animationLoopFunctions = config.map(
    ({ uniform, loopType, duration, steepness, toMaterial }) => {
      const animationLoopDuration = duration ?? loopDuration;
      const loopFunction = getLoopType(
        loopType,
        animationLoopDuration,
        steepness
      );
      return (shaderMesh: ExtendedMesh, time: number) => {
        const uniformValue = loopFunction(time);
        if (toMaterial && shaderMesh?.material.name !== toMaterial) {
          return [shaderMesh, time];
        }
        updateObjectUniformByKey(shaderMesh, uniform, uniformValue);
        return [shaderMesh, time];
      };
    }
  );
  return composeFunctions(animationLoopFunctions);
};

function composeFunctions(functions) {
  return (...args) => {
    try {
      return functions.reduce((result, currentFunc) => {
        const [newResult1, newResult2] = currentFunc(result[0], result[1]);
        return [newResult1, newResult2];
      }, args);
    } catch (error) {
      console.error("Error in composeFunctions:", error);
      throw error;
    }
  };
}
