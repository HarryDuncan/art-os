import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { InteractiveMaterialFunctions } from "./types";

export const defaultInteractiveMaterialFunctions: InteractiveMaterialFunctions = {
  onTimeUpdate: (material: InteractiveMaterial) => {
    material.uniforms.time.value += material.clock.getDelta();
  },
};
