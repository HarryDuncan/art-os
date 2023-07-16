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
import { traverseThroughtArray } from "../animation-functions/traversal/traverseThroughArray";
import { rotateMeshAlongAxis } from "../animation-functions/rotation/rotateMeshAlongAxis";
import { updateTimeStamp } from "../animation-functions/trigonometric/updateTimestampTrigonometric";
import { updateObject } from "../animation-functions/update-object/updateObject";
import { spinMeshAlongAxis } from "../animation-functions/rotation/spinMeshAlongAxis";
import { fall } from "../animation-functions/fall";
import { easeOut } from "visual/display/utils";
import { MeshObject } from "visual/set-up/config/mesh/mesh.types";

export const performAnimation = (
  animationType: AnimationType,
  object: MeshObject | Object3D,
  progress: number,
  animationConfig: AnimationProperties
) => {
  if (animationType === ANIMATION_TYPES.TRAVERSE) {
    const { curve, animationDurationMilis } =
      animationConfig as TraversalAnimationConfig;
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
    const { animationDurationMilis, rotationAxis } =
      animationConfig as RotationAnimationConfig;
    const rotation = MathUtils.degToRad(
      easeOut(progress / animationDurationMilis) * 360
    );
    rotateMeshAlongAxis(object as MeshObject, rotationAxis, rotation);
  }
  if (animationType === ANIMATION_TYPES.TRIG) {
    const { trigFunctionType } =
      animationConfig as TrigonometricAnimationConfig;
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
  if (animationType === ANIMATION_TYPES.SPIN) {
    const { rotationAxis, speed } = animationConfig as SpinAnimationConfig;
    spinMeshAlongAxis(object, rotationAxis, speed);
  }
};
