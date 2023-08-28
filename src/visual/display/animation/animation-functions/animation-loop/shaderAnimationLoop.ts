export const shaderAnimationLoop = (time, object) => {
  const duration = 10;
  const oneToOne = (Math.cos((2 * Math.PI * time) / duration) * 0.5 + 0.5) ** 2;
  const zeroToZeroLoop =
    ((Math.cos((2 * Math.PI * time) / duration) * -1 + 1) * 0.5) ** 4;
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
