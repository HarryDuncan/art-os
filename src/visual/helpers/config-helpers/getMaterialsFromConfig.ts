import { getMaterial } from "../materials/getMaterial";

export const getMaterialsFromConfig = (config) => {
  const { globalMaterialConfigs } = config;
  if (globalMaterialConfigs) {
    const materials = globalMaterialConfigs.flatMap((material) => {
      const formattedMaterial = getMaterial(
        material.materialParams,
        material.materialType
      );
      return {
        materialParameters: formattedMaterial,
        id: material.id,
        materialType: material.materialType,
      };
    });
    return materials;
  }
  return [];
};
