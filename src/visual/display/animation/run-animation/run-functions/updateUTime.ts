import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";
import { shaderAnimationLoop } from "../../animation-functions/animation-loop/shaderAnimationLoop";
import { AnimatedScene, ShaderAnimationConfig } from "../../animation.types";
import { setUpAnimationLoopParams } from "../../animation-functions/shader-animations/animation-loop/setUpAnimationLoop";

export const updateUTime = (
  scene: AnimatedScene,
  animationProperties: ShaderAnimationConfig,
  animatedObjects: ShaderMeshObject[]
) => {
  let startTime: number;
  let uTime = 0;
  const {
    animationDurationMilis,
    repeatAnimation,
    snapOnPause,
    animationPauseMilis,
  } = animationProperties;
  const duration = animationDurationMilis / 1000;
  const loopParams = setUpAnimationLoopParams();
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
      if (snapOnPause) {
      }
      if (repeatAnimation) {
        setTimeout(() => {
          scene.clock.getDelta();
          requestAnimationFrame(step);
        }, animationPauseMilis);
      }
    }
  }
  requestAnimationFrame(step);
};
