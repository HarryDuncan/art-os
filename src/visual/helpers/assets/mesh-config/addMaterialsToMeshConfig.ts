import { getMeshComponentConfigById } from "scenes/config-helpers/getMeshComponentConfigById";
import { getMaterial } from "visual/helpers/materials/getMaterial";
import { getGeometryId } from "./formatMeshGeometry";
import { DEFAULT_MATERIAL } from "visual/helpers/materials/materials.defaults";
import { MaterialConfig } from "visual/helpers/materials/materials.types";
import { Material } from "three";
import { SceneDataConfig } from "scenes/config-helpers/config.types";

export const addMaterialsToMeshConfig = (
  formattedGeometries,
  materials: Material[],
  config: SceneDataConfig
) => {
  return formattedGeometries.map((geometry) => {
    const material = getGeometryMaterial(geometry, materials, config);
    return {
      ...geometry,
      material,
    };
  });
};

const getGeometryMaterial = (
  geometry,
  globalMaterials: Material[],
  config
): Material => {
  const geometryMaterialConfig = getGeometryMaterialConfig(geometry, config);
  if (!geometryMaterialConfig) {
    console.warn(`materialConfig does not exist for ${geometry.name}`);
    return DEFAULT_MATERIAL;
  }
  const {
    materialById,
    materialType,
    materialProps,
    id,
  } = geometryMaterialConfig;
  if (materialById) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.name) === String(materialById)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(
      `could not select material by id ${geometryMaterialConfig.materialById} for ${geometry.name}`
    );
    return DEFAULT_MATERIAL;
  }
  const material = getMaterial(materialType, materialProps);
  material.name = id;
  return material;
};

const getGeometryMaterialConfig = (geometry, config): MaterialConfig => {
  const id = getGeometryId(geometry.name);
  const meshComponentConfig = getMeshComponentConfigById(id, config);
  return meshComponentConfig?.materialConfig;
};
