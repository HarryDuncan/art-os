import { MathUtils, Object3D } from "three";
import {
  AnimationProperties,
  AnimationType,
  ObjectUpdateProperty,
  // FallAnimationConfig,
  RotationAnimationConfig,
  SpinAnimationConfig,
  TraversalAnimationConfig,
  TrigonometricAnimationConfig,
} from "../animation.types";
import {
  ANIMATION_TYPES,
  OBJECT_UPDATE_PROPERTY,
} from "../animation.constants";
import { traverseThroughtArray } from "../animation-functions/mesh-animations/traversal/traverseThroughArray";
import { rotateMeshAlongAxis } from "../animation-functions/rotation/rotateMeshAlongAxis";

import { updateObject } from "../animation-functions/mesh-animations/update-object/updateObject";
import { spinMeshAlongAxis } from "../animation-functions/rotation/spinMeshAlongAxis";
import { fall } from "../animation-functions/mesh-animations/fall";
import { MeshObject } from "visual/set-up/config/mesh/mesh.types";
import { updateTimeStamp } from "../animation-functions/mesh-animations/trigonometric/updateTimestampTrigonometric";
import { easeOut } from "visual/utils/maths/maths";
import { moveObject } from "../animation-functions/mesh-animations/move/moveObject";

export const performAnimation = (
  animationType: AnimationType,
  object: MeshObject | Object3D,
  progress: number,
  animationProperties: AnimationProperties,
  count: number = 0
) => {
  if (animationType === ANIMATION_TYPES.TRAVERSE) {
    const {
      curve,
      animationDurationMilis,
    } = animationProperties as TraversalAnimationConfig;
    if (curve) {
      const currentProg = easeOut(progress / animationDurationMilis) * 100;
      const { x, y, z } = traverseThroughtArray(
        curve,
        Number(currentProg.toFixed(0))
      );
      object.position.set(x, y, z);
    }
  }

  if (animationType === ANIMATION_TYPES.ROTATE) {
    const {
      animationDurationMilis,
      rotationAxis,
    } = animationProperties as RotationAnimationConfig;
    const rotation = MathUtils.degToRad(
      easeOut(progress / animationDurationMilis) * 360
    );
    rotateMeshAlongAxis(object as MeshObject, rotationAxis, rotation);
  }
  if (animationType === ANIMATION_TYPES.TRIG) {
    const {
      trigFunctionType,
    } = animationProperties as TrigonometricAnimationConfig;
    const updatedValue = updateTimeStamp(progress, trigFunctionType);
    updateObject(
      object,
      updatedValue,
      OBJECT_UPDATE_PROPERTY.POSITION as ObjectUpdateProperty
    );
  }
  if (animationType === ANIMATION_TYPES.FALL) {
    fall(object as MeshObject, progress);
  }
  if (animationType === ANIMATION_TYPES.MOVE) {
    const { animationDurationMilis, moveTo, moveFrom } = animationProperties;
    const prog = easeOut(progress / animationDurationMilis);
    moveObject(object as MeshObject, prog, moveTo, moveFrom, count);
  }
  if (animationType === ANIMATION_TYPES.SPIN) {
    const { rotationAxis, speed } = animationProperties as SpinAnimationConfig;
    spinMeshAlongAxis(object, rotationAxis, speed);
  }
};
