import { Matrix4, Vector3 } from "three";
import { Text as TroikaText } from "troika-three-text";
import { TextProps } from "./threeJsComponents.types";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";

export const TextComponent = ({
  id,
  text,
  fontUrl,
  material = DEFAULT_MATERIAL,
  position,
}: TextProps & { id: string }) => {
  const textObject = new TroikaText();

  textObject.text = text;
  textObject.fontSize = 1.5;
  textObject.position.set(position.x, position.y, position.z);
  textObject.font = fontUrl ?? "../assets/fonts/AnimationS.woff";
  textObject.color = 0xffffff;
  textObject.depthOffset = 30;
  textObject.anchorX = "center";
  textObject.anchorY = "top";
  textObject.curveRadius = 43;
  textObject.geometry.computeBoundingBox();
  textObject.geometry.computeBoundingBox();
  const center = textObject.geometry.boundingBox.getCenter(new Vector3());

  textObject.geometry.applyMatrix4(
    new Matrix4().makeTranslation(-center.x * 2, -center.y * 2, -center.z * 2)
  );

  textObject.material = material;
  // Update the rendering:
  textObject.name = id;
  textObject.sync();
  return textObject;
};
