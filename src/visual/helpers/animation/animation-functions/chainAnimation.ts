import { AnimationFunctionProps } from "visual/components/animation-manager/animationManager.types";
import { stepAndWrap } from "visual/utils/stepAndWrap";
import { getSceneElementByName } from "../../scene/getSceneElementByName";
import { performAnimation } from "./performAnimation";

export const chainAnimation = (
  animationId: string,
  props: AnimationFunctionProps
) => {
  const {
    scene,
    targetIdentifier,
    animationConfig: { animationProperties, animationType },
  } = props;
  const animatedObjects = getSceneElementByName(scene, targetIdentifier);
  if (!animatedObjects.length) {
    console.warn(
      `${animationId} can't run. No meshes selected with ${targetIdentifier}`
    );
  }
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
      if (animationProperties.repeatAnimation) {
        setTimeout(() => {
          step(timestamp + animationProperties.animationPauseMilis);
        }, animationProperties.animationPauseMilis);
      }
    }
  }

  requestAnimationFrame(step);
};
