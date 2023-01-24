import { Matrix4, Mesh, Vector3 } from "three";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const rotateMeshAlongAxis = (mesh: Mesh, axis: AXIS, angle: number) => {
  mesh.geometry.computeBoundingBox();
  if (!mesh.geometry || !mesh.geometry.boundingBox) {
    console.warn("no bounding box");
    return;
  }
  const center = mesh.geometry.boundingBox.getCenter(new Vector3());
  mesh.geometry.applyMatrix4(
    new Matrix4().makeTranslation(-center.x, -center.y, -center.z)
  );
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
  mesh.geometry.applyMatrix4(
    new Matrix4().makeTranslation(center.x, center.y, center.z)
  );
};
