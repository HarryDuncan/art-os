import { getMeshComponentConfigs } from "visual/helpers/config-helpers/getMeshConfigConfig";
import { getMaterial } from "visual/helpers/materials/getMaterial";
import {
  DEFAULT_MATERIAL,
  MATERIAL_TYPES,
} from "visual/helpers/materials/materials.constants";
import { getGeometryId } from "./formatToMeshConfig";

export const addMaterialsToMeshConfig = (formattedGeometries, config) => {
  return formattedGeometries.map((geometry) => {
    const materialConfig = getMaterialConfig(geometry, config);
    const materialParams = materialConfig?.material ?? DEFAULT_MATERIAL;
    const materialType =
      materialConfig?.material.materialType ?? MATERIAL_TYPES.STANDARD;
    const material = getMaterial(materialParams, materialType);

    return {
      ...geometry,
      material,
      materialType,
    };
  });
};

const getMaterialConfig = (geometry, config) => {
  const id = getGeometryId(geometry.name);
  const meshComponentConfig = getMeshComponentConfigs(config);
  const specifiedComponentConfig = meshComponentConfig[id];
  return specifiedComponentConfig?.material;
};
