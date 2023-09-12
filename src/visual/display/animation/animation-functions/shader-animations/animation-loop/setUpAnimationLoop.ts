import { ExtendedMesh } from "visual/set-up/config/mesh/mesh.types";
import { getLoopType } from "./getLoopTypes";
import { updateObjectUniformByKey } from "../uniforms/updateObjectUniformByKey";
import { AnimationLoopConfigItem } from "./animationloop.types";

const defaultConfig = [{
  "uniform": "uTime",
  "loopType": "LINEAR"
}];
export const setUpAnimationLoop = (
  config: AnimationLoopConfigItem[],
  loopDuration?: number
): ((shaderMesh: ExtendedMesh, time: number) => [shaderMesh : ExtendedMesh, time : number]) => {
  const animationConfig = [...defaultConfig, ...config ] as AnimationLoopConfigItem[]
  const animationLoopFunctions = animationConfig.map(
    ({ uniform, loopType, duration, steepness, toMaterial , loopLimit}) => {
      const animationLoopDuration = duration ?? loopDuration;
      const loopFunction = getLoopType(
        loopType,
        animationLoopDuration,
        steepness,
        loopLimit
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
