import { Matrix4, Mesh, MeshPhongMaterial, Vector3 } from "three";
import { Text as TroikaText } from "troika-three-text";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { getMaterial } from "visual/helpers/materials/getMaterial";
import { TextProps } from "./threeJsComponents.types";

export const Text = ({
  name,
  text,
  fontUrl,
  materialProps,
  position,
}: TextProps) => {
  const textObject = new TroikaText();

  textObject.text = text;
  textObject.fontSize = 1.5;
  textObject.position.set(position.x, position.y, position.z);
  textObject.font = fontUrl ?? "../assets/AnimationS.woff";
  textObject.color = 0xffffff;
  textObject.depthOffset = 30;
  textObject.anchorX = "center";
  textObject.anchorY = "top";
  textObject.curveRadius = 43;
  textObject.geometry.computeBoundingBox();
  textObject.geometry.computeBoundingBox();
  let center = textObject.geometry.boundingBox.getCenter(new Vector3());

  textObject.geometry.applyMatrix4(
    new Matrix4().makeTranslation(-center.x * 2, -center.y * 2, -center.z * 2)
  );
  if (materialProps) {
    const material = getMaterial(materialProps, MATERIAL_TYPES.matcap);
    textObject.material = material;
  }
  // Update the rendering:
  textObject.name = name;
  textObject.sync();
  return textObject;
};
