import { AnimationFunctionProps } from "visual/components/animation-manager/animationManager.types";
import { getMeshesByIdentifier } from "visual/helpers/scene/getMeshesByIdentifier";
import { degreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";
import { easeOut } from "visual/utils";
import { stepAndWrap } from "visual/utils/stepAndWrap";
import {
  AnimationConfig,
  AnimationProperties,
  ANIMATION_TYPES,
} from "./animation.types";
import { rotateMeshAlongAxis } from "./rotation/rotateMeshAlongAxis";

export const chainAnimation = (
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
  let currentItemIndex = 0;

  function step(timestamp: number) {
    const object = animatedObjects[currentItemIndex];
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    performAnimation(animationType, object, progress, animationProperties);
    if (progress < animationProperties.animationDurationMilis) {
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
          requestAnimationFrame(step);
        }, animationProperties.animationPauseMilis);
      }
    }
  }

  requestAnimationFrame(step);
};

const performAnimation = (
  animationType: ANIMATION_TYPES,
  object,
  progress,
  animationConfig: AnimationProperties
) => {
  switch (animationType) {
    case ANIMATION_TYPES.ROTATE: {
      const { animationDurationMilis, rotationAxis } = animationConfig;
      const rotation = degreesToEuler(
        easeOut(progress / animationDurationMilis) * 360
      );
      rotateMeshAlongAxis(object, rotationAxis, rotation);
    }
  }
};
