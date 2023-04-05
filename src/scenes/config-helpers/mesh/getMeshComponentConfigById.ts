import { SceneDataConfig } from "../config.types";
import { getMeshComponentConfig } from "./getMeshComponentConfig";

export const getMeshComponentConfigById = (
  id: string,
  config: SceneDataConfig
) => {
  const meshComponentConfig = getMeshComponentConfig(config);
  if (!meshComponentConfig) {
    console.warn("no mesh component config for this config");
    return null;
  }
  const configById = meshComponentConfig[id];
  if (!configById) {
    console.warn(`no config for ${id}`);
  }
  return configById ?? null;
};
