import { performAnimation } from "../performAnimation";

import { MeshObject } from "visual/set-up/config/mesh/mesh.types";
import { Object3D } from "three";
import { AnimationProperties } from "../../animation.types";

export const animateAll = (
  animationProperties: AnimationProperties,
  animatedObjects: MeshObject[] | Object3D[]
) => {
  const {
    animationDurationMilis,
    animationType,
    repeatAnimation,
    animationPauseMilis,
  } = animationProperties;
  let startTime: number;
  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    animatedObjects.forEach((object) => {
      performAnimation(animationType, object, progress, animationProperties);
    });
    if (progress < animationDurationMilis || animationDurationMilis === -1) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      if (repeatAnimation) {
        setTimeout(() => {
          requestAnimationFrame(step);
        }, animationPauseMilis);
      }
    }
  }
  requestAnimationFrame(step);
};
