import computeConfig from "config/scenes/computeConfig.json";
import ltwConfig from "config/scenes/ltw.json";
import { useMemo } from "react";
import { SceneDataConfig } from "visual/set-up/config/config.types";

export const useSceneConfig = (): SceneDataConfig => {
  // TODO - fetch from public folder
  return useMemo(() => {
    // @ts-ignore
    // return computeConfig[0] as SceneDataConfig;
    return ltwConfig[0] as SceneDataConfig;
  }, []);
};
