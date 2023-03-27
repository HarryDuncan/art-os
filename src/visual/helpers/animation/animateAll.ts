import { AnimationFunctionProps } from "visual/components/animation-manager/animationManager.types";
import { getMeshesByIdentifier } from "visual/helpers/scene/object-finding/getMeshesByIdentifier";
import { degreesToEuler } from "visual/helpers/three-dimension-space/degreesToEuler";
import { easeOut } from "visual/utils";
import {
  AnimationProperties,
  AnimationType,
  ANIMATION_TYPES,
  RotationAnimationConfig,
  SpinAnimationConfig,
} from "./animation.types";
import { rotateMeshAlongAxis } from "./rotation/rotateMeshAlongAxis";
import { spinMeshAlongAxis } from "./rotation/spinMeshAlongAxis";

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

const performAnimation = (
  animationType: AnimationType,
  object,
  progress,
  animationConfig: AnimationProperties
) => {
  switch (animationType) {
    case ANIMATION_TYPES.ROTATE:
      {
        const {
          animationDurationMilis,
          rotationAxis,
        } = animationConfig as RotationAnimationConfig;
        const rotation = degreesToEuler(
          easeOut(progress / animationDurationMilis) * 360
        );
        rotateMeshAlongAxis(object, rotationAxis, rotation);
      }
      break;
    case ANIMATION_TYPES.SPIN:
    default: {
      const { rotationAxis, speed } = animationConfig as SpinAnimationConfig;
      spinMeshAlongAxis(object, rotationAxis, speed);
    }
  }
};
