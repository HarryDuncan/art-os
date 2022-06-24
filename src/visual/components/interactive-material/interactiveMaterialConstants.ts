import InteractiveMaterial from "visual/hooks/use-interactive-material/InteractiveMaterial";
import { InteractiveMaterialFunctions } from "./types";

export const defaultInteractiveMaterialFunctions: InteractiveMaterialFunctions = {
  onTimeUpdate: (material: InteractiveMaterial) => {
    material.uniforms.time.value += material.clock.getDelta();
  },
};
