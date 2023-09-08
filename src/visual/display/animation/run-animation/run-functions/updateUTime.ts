import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";
import { shaderAnimationLoop } from "../../animation-functions/animation-loop/shaderAnimationLoop";
import { AnimatedScene, AnimationProperties } from "../../animation.types";

export const updateUTime = (
  scene: AnimatedScene,
  animationProperties: AnimationProperties,
  animatedObjects: ShaderMeshObject[]
) => {
  let startTime: number;
  let uTime = 0;
  const { animationDurationMilis } = animationProperties;
  const duration = animationDurationMilis / 1000;
  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    uTime += scene.clock.getDelta();

    animatedObjects.forEach((object) => {
      object.material.uniforms.uTime.value = uTime;
      shaderAnimationLoop(uTime, duration, object);
    });
    if (progress <= animationDurationMilis || animationDurationMilis === -1) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      if (animationProperties.repeatAnimation) {
        setTimeout(() => {
          scene.clock.getDelta();
          requestAnimationFrame(step);
        }, animationProperties.animationPauseMilis);
      }
    }
  }
  requestAnimationFrame(step);
};
