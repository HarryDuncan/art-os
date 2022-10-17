import { InteractiveMaterialType } from "scenes/gallery-scenes/types";

export const UPDATE_TIME_UNIFORM = {
  onTimeUpdate: (material: InteractiveMaterialType) => {
    const delta = material.clock.getDelta();
    material.uniforms.uTime.value += delta;
  },
};
