import { Material } from "three";
import {
  MeshComponentConfig,
  SceneDataConfig,
} from "scenes/config-helpers/config.types";
import { DEFAULT_MATERIAL } from "visual/materials/materials.defaults";
import { getMaterial } from "visual/materials/getMaterial";

export const addMaterials = (
  meshes,
  materials: Material[],
  config: SceneDataConfig
) => {
  const { meshComponentConfigs } = config;
  return meshes.map((mesh) => {
    const meshConfig = meshComponentConfigs.find(
      (config) => config.id === mesh.name
    );
    const material = setUpMaterial(mesh, materials, meshConfig);
    return {
      ...mesh,
      material,
    };
  });
};

const setUpMaterial = (
  mesh,
  globalMaterials: Material[],
  config?: MeshComponentConfig
): Material => {
  if (!config?.materialConfig) {
    console.warn(`materialConfig does not exist for ${mesh.name}`);
    return DEFAULT_MATERIAL;
  }
  const {
    materialById,
    materialType,
    materialProps,
    id,
  } = config.materialConfig;
  if (materialById) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.name) === String(materialById)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(
      `could not select material by id ${materialById} for ${mesh.name}`
    );
    return DEFAULT_MATERIAL;
  }
  const material = getMaterial(materialType, materialProps);
  material.name = id;
  return material;
};
