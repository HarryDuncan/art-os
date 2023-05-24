import { Material } from "three";
import { getMaterial } from "visual/materials/getMaterial";
import { MaterialConfig } from "visual/materials/materials.types";

export const materialConfigToMaterial = (materialConfig: MaterialConfig) => {
  const { materialType, materialProps, id } = materialConfig;
  const material = getMaterial(materialType, materialProps) as Material;
  material.name = id;
  return material;
};
