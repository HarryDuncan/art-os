import { Material } from "three";
import { getMaterial } from "visual/display/materials/getMaterial";
import { MaterialConfig } from "visual/set-up/config/material/materials.types";

export const materialConfigToMaterial = (materialConfig: MaterialConfig) => {
  const { materialType, materialProps, id } = materialConfig;
  const material = getMaterial(materialType, materialProps) as Material;
  material.name = id;
  return material;
};
