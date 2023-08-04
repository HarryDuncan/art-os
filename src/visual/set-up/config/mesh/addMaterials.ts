import { Material } from "three";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";
import { getMaterial } from "visual/display/materials/getMaterial";
import { FormattedGeometry } from "visual/set-up/assets/geometry/geometry.types";
import { MeshComponentConfig } from "../config.types";

export const addMaterials = (
  formattedGeometries: FormattedGeometry[],
  materials: Material[],
  meshComponentConfigs: MeshComponentConfig[]
) => {
  return formattedGeometries.map((formattedGeometry) => {
    const meshConfig = meshComponentConfigs.find(
      (config) => formattedGeometry.name?.indexOf(config.id) !== -1
    );

    const material = setUpMaterial(formattedGeometry, materials, meshConfig);
    return {
      ...formattedGeometry,
      material,
    };
  });
};

const setUpMaterial = (
  formattedGeometry: FormattedGeometry,
  globalMaterials: Material[],
  config?: MeshComponentConfig
): Material => {
  if (!config?.materialConfig) {
    console.warn(`materialConfig does not exist for ${formattedGeometry.name}`);
    return DEFAULT_MATERIAL;
  }
  const { materialById, materialType, materialProps, id } =
    config.materialConfig;
  if (materialById) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.name) === String(materialById)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(
      `could not select material by id ${materialById} for ${formattedGeometry.name}`
    );
    return DEFAULT_MATERIAL;
  }
  const material = getMaterial(materialType, materialProps);
  material.name = id;
  return material;
};
