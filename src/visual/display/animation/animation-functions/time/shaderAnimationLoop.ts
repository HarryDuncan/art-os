export const shaderAnimationLoop = (time, object) => {
  const animationLength = 10;
  const oneToOneLoop =
    (Math.cos((2 * Math.PI * time) / animationLength) * -1 + 1) * 0.5;

  const oneToZero = (time % animationLength) / animationLength;
  const loopCount = Math.floor(time / animationLength);
  const loopLimit = 3;
  const limitedLoopCount = loopCount % loopLimit;
  object.material.uniforms.uProgress.value = oneToZero;
  object.material.uniforms.uLoopCount.value = limitedLoopCount;
};
