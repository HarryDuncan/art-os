import { SHADER_MATERIALS } from "visual/display/materials/materials.consts";
import { SceneConfig } from "../config.types";
import { materialConfigToMaterial } from "./materialConfigToMaterial";
import { Material } from "three";

export const getMaterialsFromConfig = (config: SceneConfig): Material[] => {
  const { globalMaterialConfigs } = config;
  if (globalMaterialConfigs) {
    return globalMaterialConfigs.flatMap((materialConfig) => {
      return !SHADER_MATERIALS.includes(materialConfig.materialType)
        ? materialConfigToMaterial(materialConfig)
        : [];
    });
  }
  return [];
};
