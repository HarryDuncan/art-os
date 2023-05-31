import {
  AXIS,
  Axis,
} from "visual/display/helpers/three-dimension-space/position/position.types";
import { updateObjectPosition } from "./updateObjectPosition";

const OBJECT_PARAMETER = {
  POSITION: "POSITION",
  ROTATION: "ROTATION",
};
export const updateObject = (object, updatedValue, objectParameter) => {
  switch (objectParameter) {
    case OBJECT_PARAMETER.POSITION:
    default:
      updateObjectPosition(object, updatedValue, AXIS.X as Axis);
  }
};
