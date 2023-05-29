import { SceneDataConfig } from "../config.types";

export const getMeshComponentConfigById = (
  id: string,
  config: SceneDataConfig
) => {
  const { meshComponentConfigs } = config;
  if (!meshComponentConfigs) {
    console.warn("no mesh component config for this config");
    return null;
  }
  const configById = meshComponentConfigs.find((config) => config.id === id);
  if (!configById) {
    console.warn(`no config for ${id}`);
  }
  return configById ?? null;
};
