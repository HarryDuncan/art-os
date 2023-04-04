import { SceneDataConfig } from "./config.types";
import { materialConfigToMaterial } from "./materialConfigToMaterial";

export const getMaterialsFromConfig = (config: SceneDataConfig) => {
  const { globalMaterialConfigs } = config;
  if (globalMaterialConfigs) {
    return globalMaterialConfigs.flatMap((materialConfig) =>
      materialConfigToMaterial(materialConfig)
    );
  }
  return [];
};
