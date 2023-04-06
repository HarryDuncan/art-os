import computeConfig from "config/computeConfig.json";
import { SceneDataConfig } from "./config-helpers/config.types";
import { useMemo } from "react";

export const useSceneConfig = (): SceneDataConfig => {
  // TODO - fetch from public folder
  return useMemo(() => {
    // @ts-ignore
    return computeConfig[0] as SceneDataConfig;
  }, []);
};
