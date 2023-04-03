import { getMeshComponentConfigById } from "visual/helpers/config-helpers/getMeshComponentConfigById";
import { getMaterial } from "visual/helpers/materials/getMaterial";
import {
  DEFAULT_MATERIAL,
  MATERIAL_TYPES,
} from "visual/helpers/materials/materials.constants";
import { getGeometryId } from "./formatMeshGeometry";

export const addMaterialsToMeshConfig = (
  formattedGeometries,
  materials,
  config
) => {
  return formattedGeometries.map((geometry) => {
    const materialConfig = getMaterialConfig(geometry, config);
    const { materialParameters, materialType } = getMaterialParameters(
      materialConfig,
      materials
    );
    const material = getMaterial(materialParameters, materialType);
    return {
      ...geometry,
      material,
    };
  });
};

const getMaterialConfig = (geometry, config) => {
  const id = getGeometryId(geometry.name);
  const meshComponentConfig = getMeshComponentConfigById(id, config);
  return meshComponentConfig?.materialConfig;
};

const getMaterialParameters = (materialConfig, globalMaterials) => {
  if (!materialConfig) {
    console.warn(`materialConfig does not exist`);
  } else if (materialConfig.material) {
    return {
      materialParameters: materialConfig.material,
      materialType: materialConfig.type,
    };
  } else if (materialConfig.materialById) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.id) === String(materialConfig.materialById)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(
      `could not select material by id ${materialConfig.materialById}`
    );
  }
  return {
    materialParameters: DEFAULT_MATERIAL,
    materialType: MATERIAL_TYPES.STANDARD,
  };
};
