import { ShaderMeshObject } from "visual/set-up/config/mesh/mesh.types";
import { shaderAnimationLoop } from "../animation-loop/shaderAnimationLoop";
import { AnimatedScene, ShaderAnimationConfig } from "../../animation.types";
import { setUpAnimationLoop } from "./animation-loop/setUpAnimationLoop";

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
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    shaderTime += scene.clock.getDelta();
    animatedObjects.forEach((animatedObject) => {
      animationLoop(animatedObject, shaderTime);
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
