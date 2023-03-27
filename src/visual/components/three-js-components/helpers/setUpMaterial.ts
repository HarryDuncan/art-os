import { getMaterial } from "visual/helpers/materials/getMaterial";
import { MATERIAL_TYPES } from "visual/helpers/materials/materials.constants";
import {
  MaterialParameterTypes,
  MaterialType,
} from "visual/helpers/materials/materials.types";

export const setUpMaterial = (material: MaterialParameterTypes) => {
  const { materialType } = material;
  return getMaterial(
    material,
    materialType ?? (MATERIAL_TYPES.STANDARD as MaterialType)
  );
};
