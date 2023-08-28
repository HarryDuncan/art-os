import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import { shaderAnimationLoop } from "../../animation-functions/animation-loop/shaderAnimationLoop";

export const updateUTime = (
  scene: InteractiveScene,
  animationProperties,
  animatedObjects
) => {
  let startTime: number;
  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const uTime = scene.clock.getElapsedTime();
    animatedObjects.forEach((object) => {
      object.material.uniforms.uTime.value = uTime;
      shaderAnimationLoop(uTime, object);
    });
    if (
      progress < animationProperties.animationDurationMilis ||
      animationProperties.animationDurationMilis === -1
    ) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      if (animationProperties.repeatAnimation) {
        setTimeout(() => {
          requestAnimationFrame(step);
        }, animationProperties.animationPauseMilis);
      }
    }
  }
  requestAnimationFrame(step);
};
