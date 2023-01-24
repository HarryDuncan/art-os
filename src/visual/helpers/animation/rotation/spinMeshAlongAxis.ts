import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const spinMeshAlongAxis = (object, axis: AXIS, speed: number) => {
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
