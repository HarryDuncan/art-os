import { Material } from "three";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";
import { getMaterial } from "visual/display/materials/getMaterial";
import { FormattedGeometry } from "visual/set-up/assets/geometry/geometry.types";
import { MeshComponentConfig } from "../config.types";

export const addMaterials = (
  meshes: FormattedGeometry[],
  materials: Material[],
  meshComponentConfigs: MeshComponentConfig[]
) => {
  return meshes.map((mesh) => {
    const meshConfig = meshComponentConfigs.find(
      (config) => mesh.name?.indexOf(config.id) !== -1
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
