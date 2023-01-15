import { Mesh, MeshPhongMaterial } from "three";
import { Text as TroikaText } from "troika-three-text";
import { MATERIAL_TYPES } from "visual/helpers/geometry/three-geometry/types";
import { getMaterial } from "visual/helpers/materials/getMaterial";

export const Text = ({ name, text, font, materialProps }) => {
  const textObject = new TroikaText();

  textObject.text = text;
  textObject.fontSize = 2.5;
  textObject.position.z = 0;
  textObject.position.z = -10;

  textObject.font = font ?? "../assets/AnimationS.woff";
  textObject.color = 0xffffff;
  textObject.depthOffset = 30;
  textObject.anchorX = "center";
  textObject.anchorY = "center";
  textObject.curveRadius = 43;
  if (materialProps) {
    const material = getMaterial(materialProps, MATERIAL_TYPES.matcap);
    textObject.material = material;
  }
  // Update the rendering:
  textObject.name = name;
  textObject.sync();
  return textObject;
};
