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
      const currentX = mesh.rotation.x;
      mesh.rotateX(angle - currentX);
      break;
    case AXIS.Y:
      const currentY = mesh.rotation.y;
      mesh.rotateY(angle - currentY);
      break;
    case AXIS.Z:
      const currentZ = mesh.rotation.z;
      mesh.rotateZ(angle - currentZ);
  }
  mesh.geometry.applyMatrix4(
    new Matrix4().makeTranslation(center.x, center.y, center.z)
  );
};
