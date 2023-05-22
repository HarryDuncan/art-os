import computeConfig from "config/scenes/computeConfig.json";
import ltwConfig from "config/scenes/ltw.json";
import { SceneDataConfig } from "./config-helpers/config.types";
import { useMemo } from "react";

export const useSceneConfig = (): SceneDataConfig => {
  // TODO - fetch from public folder
  return useMemo(() => {
    // @ts-ignore
    // return computeConfig[0] as SceneDataConfig;
    return ltwConfig[0] as SceneDataConfig;
  }, []);
};
