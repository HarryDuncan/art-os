import { performAnimation } from "./performAnimation";
import { AnimationConfig } from "../animation.types";
import { MeshObject } from "visual/set-up/config/mesh/mesh.types";
import { Object3D } from "three";

export const animateAll = (
  animationConfig: AnimationConfig,
  animatedObjects: MeshObject[] | Object3D[]
) => {
  const { animationProperties, animationType } = animationConfig;
  let startTime: number;
  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    animatedObjects.forEach((object) => {
      performAnimation(animationType, object, progress, animationProperties);
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
