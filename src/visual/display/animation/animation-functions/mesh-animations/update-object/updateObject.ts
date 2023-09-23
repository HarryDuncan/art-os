import { updateObjectPosition } from "./updateObjectPosition";
import { Object3D } from "three";
import { ObjectUpdateProperty } from "../../../animation.types";
import {
  AXIS,
  Axis,
} from "visual/utils/three-dimension-space/position/position.types";

const OBJECT_PARAMETER = {
  POSITION: "POSITION",
  ROTATION: "ROTATION",
};
export const updateObject = (
  object: Object3D,
  updatedValue: number,
  objectParameter: ObjectUpdateProperty
) => {
  switch (objectParameter) {
    case OBJECT_PARAMETER.POSITION:
    default:
      updateObjectPosition(object, updatedValue, AXIS.X as Axis);
  }
};
