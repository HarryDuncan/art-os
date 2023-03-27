import { MathUtils } from "three";
import { AnimationFunctionProps } from "visual/components/animation-manager/animationManager.types";
import { easeOut } from "visual/utils";
import { stepAndWrap } from "visual/utils/stepAndWrap";
import { getSceneElementByName } from "../scene/getSceneElementByName";
import {
  AnimationProperties,
  AnimationType,
  ANIMATION_TYPES,
  RotationAnimationConfig,
  SpinAnimationConfig,
  TraversalAnimationConfig,
} from "./animation.types";
import { rotateMeshAlongAxis } from "./rotation/rotateMeshAlongAxis";
import { spinMeshAlongAxis } from "./rotation/spinMeshAlongAxis";
import { traverseThroughtArray } from "./traversal/traverseThroughArray";

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

const performAnimation = (
  animationType: AnimationType,
  object,
  progress,
  animationConfig: AnimationProperties
) => {
  switch (animationType) {
    case ANIMATION_TYPES.TRAVERSE:
      {
        const {
          curve,
          animationDurationMilis,
        } = animationConfig as TraversalAnimationConfig;
        if (curve) {
          const currentProg = easeOut(progress / animationDurationMilis) * 100;
          const { x, y, z } = traverseThroughtArray(
            curve,
            Number(currentProg.toFixed(0))
          );
          object.position.set(x, y, z);
        }
      }
      break;
    case ANIMATION_TYPES.ROTATE:
      {
        const {
          animationDurationMilis,
          rotationAxis,
        } = animationConfig as RotationAnimationConfig;
        const rotation = MathUtils.degToRad(
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
