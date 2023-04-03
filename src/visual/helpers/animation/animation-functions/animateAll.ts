import { AnimationFunctionProps } from "visual/components/animation-manager/animationManager.types";
import { getMeshesByIdentifier } from "visual/helpers/scene/object-finding/getMeshesByIdentifier";
import { performAnimation } from "./performAnimation";

export const animateAll = (
  animationId: string,
  props: AnimationFunctionProps
) => {
  const {
    scene,
    targetIdentifier,
    animationConfig: { animationProperties, animationType },
  } = props;
  const animatedObjects = getMeshesByIdentifier(scene, targetIdentifier);
  if (!animatedObjects.length) {
    console.warn(
      `${animationId} can't run. No meshes selected with ${targetIdentifier}`
    );
  }
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
