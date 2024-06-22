import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";
import { AnimatedScene, ShaderAnimationConfig } from "../../animation.types";
import { setUpAnimationLoop } from "./animation-loop/setUpAnimationLoop";
import { snapAnimationLoopOnPause } from "./animation-loop/snapAnimationLoopOnPause";

export const runShaderAnimations = (
  scene: AnimatedScene,
  animationProperties: ShaderAnimationConfig,
  animatedObjects: ShaderMeshObject[]
) => {
  let startTime: number;
  let shaderTime = 0;
  const {
    animationDurationMilis,
    repeatAnimation,
    snapOnPause,
    animationPauseMilis,
    animationLoopConfig,
  } = animationProperties;
  const duration = animationDurationMilis / 1000;
  const animationLoop = setUpAnimationLoop(animationLoopConfig, duration);
  function step(timestamp: number) {
    if (startTime === 0) {
      scene.clock.getElapsedTime();
    }
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    shaderTime = scene.clock.getElapsedTime();
    animatedObjects.forEach((animatedObject) => {
      animationLoop(animatedObject, shaderTime);
    });
    if (
      progress <= animationDurationMilis - 20 ||
      animationDurationMilis === -1
    ) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      shaderTime = Math.round(shaderTime);
      if (snapOnPause) {
        animatedObjects.forEach((animatedObject) => {
          snapAnimationLoopOnPause(animationLoopConfig, animatedObject);
        });
      }
      if (repeatAnimation) {
        setTimeout(() => {
          requestAnimationFrame(step);
        }, animationPauseMilis);
      }
    }
  }
  requestAnimationFrame(step);
};
