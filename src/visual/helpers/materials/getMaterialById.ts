import { Material } from "three";
import { DEFAULT_MATERIAL } from "./materials.defaults";

export const getMaterialById = (materialId: string, materials: Material[]) => {
  const selectedMaterial = materials.find(
    (material) => material.name === materialId
  );
  if (selectedMaterial) return selectedMaterial;
  console.warn(`Material:${materialId} not found`);
  return DEFAULT_MATERIAL;
};
