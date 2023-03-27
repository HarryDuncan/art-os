import { Mesh } from "three";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const rotateMeshAlongAxis = (mesh: Mesh, axis: AXIS, angle: number) => {
  mesh.geometry.computeBoundingBox();
  if (!mesh.geometry || !mesh.geometry.boundingBox) {
    console.warn("no bounding box");
    return;
  }
  // TODO - update with this

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
