import { easeOut } from "visual/utils";
import {
  ANIMATION_TYPES,
  AnimationProperties,
  AnimationType,
  RotationAnimationConfig,
  SpinAnimationConfig,
  TraversalAnimationConfig,
  TrigonometricAnimationConfig,
} from "../animation.types";
import { traverseThroughtArray } from "./traversal/traverseThroughArray";
import { MathUtils } from "three";
import { rotateMeshAlongAxis } from "./rotation/rotateMeshAlongAxis";
import { spinMeshAlongAxis } from "./rotation/spinMeshAlongAxis";
import { updateTimeStamp } from "./trigonometric/updateTimestampTrigonometric";
import { updateObject } from "./update-object/updateObject";
import { OBJECT_UPDATE_PROPERTY } from "../animation.constants";

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
    case ANIMATION_TYPES.TRIG: {
      const {
        trigFunctionType,
      } = animationConfig as TrigonometricAnimationConfig;
      const updatedValue = updateTimeStamp(progress, trigFunctionType);
      updateObject(object, updatedValue, OBJECT_UPDATE_PROPERTY.POSITION);
    }
    case ANIMATION_TYPES.SPIN:
    default: {
      const { rotationAxis, speed } = animationConfig as SpinAnimationConfig;
      spinMeshAlongAxis(object, rotationAxis, speed);
    }
  }
};
