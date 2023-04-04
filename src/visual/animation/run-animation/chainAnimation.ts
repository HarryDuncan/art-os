import { stepAndWrap } from "visual/utils/stepAndWrap";
import { performAnimation } from "./performAnimation";
import { AnimationConfig } from "../animation.types";

export const chainAnimation = (
  animationConfig: AnimationConfig,
  animatedObjects
) => {
  const { animationProperties, animationType } = animationConfig;
  let startTime: number;
  let currentItemIndex = 0;
  function step(timestamp: number) {
    const object = animatedObjects[currentItemIndex];
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    performAnimation(animationType, object, progress, animationProperties);
    if (
      progress < animationProperties.animationDurationMilis ||
      animationProperties.animationDurationMilis === -1
    ) {
      requestAnimationFrame(step);
    } else {
      startTime = 0;
      currentItemIndex = stepAndWrap(
        0,
        animatedObjects.length - 1,
        currentItemIndex
      );
      console.log("finished");
      if (animationProperties.repeatAnimation) {
        setTimeout(() => {
          step(timestamp + animationProperties.animationPauseMilis);
        }, animationProperties.animationPauseMilis);
      }
    }
  }

  requestAnimationFrame(step);
};
