import { Material } from "three";
import { getMaterial } from "./getMaterial";
import { DEFAULT_MATERIAL, MATERIAL_TYPES } from "./materials.constants";
import { MaterialParameterTypes, MaterialType } from "./materials.types";

export const setUpMaterial = (
  material: MaterialParameterTypes = DEFAULT_MATERIAL
): Material => {
  const { materialType } = material;
  return getMaterial(
    material,
    materialType ?? (MATERIAL_TYPES.STANDARD as MaterialType)
  ) as Material;
};
