import {
  AXIS,
  Axis,
} from "visual/display/helpers/three-dimension-space/position/position.types";
import { MeshObject } from "visual/set-up/config/mesh/mesh.types";

export const rotateMeshAlongAxis = (
  mesh: MeshObject,
  axis: Axis,
  angle: number
) => {
  mesh.geometry.computeBoundingBox();
  if (!mesh.geometry || !mesh.geometry.boundingBox) {
    console.warn("no bounding box");
    return;
  }
  switch (axis) {
    case AXIS.X:
      mesh.rotateX(angle - mesh.rotation.x);
      break;
    case AXIS.Y:
      mesh.rotateY(angle - mesh.rotation.y);
      break;
    case AXIS.Z:
    default:
      mesh.rotateZ(angle - mesh.rotation.z);
  }
};
