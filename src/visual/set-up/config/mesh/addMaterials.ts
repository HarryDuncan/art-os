import { Material } from "three";
import { DEFAULT_MATERIAL } from "visual/display/materials/materials.defaults";
import {
  FormattedGeometry,
  MeshConfig,
} from "visual/set-up/assets/geometry/geometry.types";
import { MeshComponentConfig } from "../config.types";

export const addMaterials = (
  formattedGeometries: FormattedGeometry[],
  materials: Material[],
  meshComponentConfigs: MeshComponentConfig[]
): MeshConfig[] => {
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
  const { materialId } = config ?? {};
  if (materialId) {
    const selectedMaterial = globalMaterials.find(
      (material) => String(material.name) === String(materialId)
    );
    if (selectedMaterial) {
      return selectedMaterial;
    }
    console.warn(
      `could not select material by id ${materialId} for ${formattedGeometry.name}`
    );
    return DEFAULT_MATERIAL;
  }
  console.warn(`material not linked for ${formattedGeometry.name}`);
  return DEFAULT_MATERIAL;
};
