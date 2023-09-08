import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";

export const shaderAnimationLoop = (
  time: number,
  duration: number,
  object: ShaderMeshObject
) => {
  const oneToOne =
    (Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5) ** 30;
  const zeroToZeroLoop =
    ((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5) ** 0.5;
  const oneToZero = (time % duration) / duration;
  const loopCount = Math.floor(time / duration);
  const loopLimit = 3;
  const limitedLoopCount = loopCount % loopLimit;
  object.material.uniforms.uProgress.value = oneToZero;
  object.material.uniforms.uLoopCount.value = limitedLoopCount;

  if (object.material.name === "morphing-material-1") {
    object.material.uniforms.uOpacity.value = oneToOne;
  } else {
    object.material.uniforms.uOpacity.value = zeroToZeroLoop;
  }
};
