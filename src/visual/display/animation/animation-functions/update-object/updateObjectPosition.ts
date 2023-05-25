import {
  AXIS,
  Axis,
} from "visual/display/helpers/three-dimension-space/position/position.types";

export const updateObjectPosition = (object, value, axis: Axis) => {
  const {
    position: { x, y, z },
  } = object;
  switch (axis) {
    case AXIS.X:
      object.position.set(value, y, z);
      break;
    case AXIS.Y:
      object.position.set(x, value, z);
      break;
    case AXIS.Z:
    default:
      object.position.set(x, y, value);
  }
};
