import { MathUtils } from "three";
import { easeOut } from "visual/utils";
import {
  AnimationProperties,
  AnimationType,
  RotationAnimationConfig,
  SpinAnimationConfig,
  TraversalAnimationConfig,
  TrigonometricAnimationConfig,
} from "../animation.types";

import {
  ANIMATION_TYPES,
  OBJECT_UPDATE_PROPERTY,
} from "../animation.constants";
import { traverseThroughtArray } from "../animation-functions/traversal/traverseThroughArray";
import { rotateMeshAlongAxis } from "../animation-functions/rotation/rotateMeshAlongAxis";
import { updateTimeStamp } from "../animation-functions/trigonometric/updateTimestampTrigonometric";
import { updateObject } from "../animation-functions/update-object/updateObject";
import { spinMeshAlongAxis } from "../animation-functions/rotation/spinMeshAlongAxis";

export const performAnimation = (
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
    case ANIMATION_TYPES.TRIG:
      {
        const {
          trigFunctionType,
        } = animationConfig as TrigonometricAnimationConfig;
        const updatedValue = updateTimeStamp(progress, trigFunctionType) * 2;
        console.log(updatedValue);
        updateObject(object, updatedValue, OBJECT_UPDATE_PROPERTY.POSITION);
      }
      break;
    case ANIMATION_TYPES.SPIN:
    default: {
      const { rotationAxis, speed } = animationConfig as SpinAnimationConfig;
      spinMeshAlongAxis(object, rotationAxis, speed);
    }
  }
};
