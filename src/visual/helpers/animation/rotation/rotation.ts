import { Matrix4, Vector3 } from "three";
import { AXIS } from "visual/helpers/three-dimension-space/position/position.types";

export const rotateText = (text, axis: AXIS, angle: number) => {
  text.geometry.computeBoundingBox();
  let center = text.geometry.boundingBox.getCenter(new Vector3());
  text.geometry.applyMatrix4(
    new Matrix4().makeTranslation(-center.x, -center.y, -center.z)
  );
  text.rotateX(angle);
  text.geometry.applyMatrix4(
    new Matrix4().makeTranslation(center.x, center.y, center.z)
  );
};
