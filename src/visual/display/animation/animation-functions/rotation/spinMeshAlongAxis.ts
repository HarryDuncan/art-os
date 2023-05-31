import {
  AXIS,
  Axis,
} from "visual/display/helpers/three-dimension-space/position/position.types";

export const spinMeshAlongAxis = (object, axis: Axis, speed: number) => {
  switch (axis) {
    case AXIS.X:
      object.rotation.x += speed;
      break;
    case AXIS.Y:
      object.rotation.y += speed;
      break;
    case AXIS.Z:
    default:
      object.rotation.z += speed;
      break;
  }
};
