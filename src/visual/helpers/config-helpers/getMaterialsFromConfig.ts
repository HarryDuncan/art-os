import { getMaterial } from "../materials/getMaterial";

export const getMaterialsFromConfig = (config) => {
  const { globalMaterials } = config;
  if (globalMaterials) {
    const materials = globalMaterials.flatMap((material) => {
      const formattedMaterial = getMaterial(
        material.materialParameters,
        material.materialType
      );
      return { formattedMaterial, id: material.id };
    });
    return materials;
  }
  return [];
};
