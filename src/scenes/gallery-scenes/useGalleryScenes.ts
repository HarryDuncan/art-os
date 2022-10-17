import { useCallback } from "react";
import { useDefaultConfig } from "scenes/default-configs/useDefaultConfig";
import * as OldConfigSceneParams from "./old-config";
import * as Scenes from "./split-config";

export const useGalleryScenes = () => {
  const { threeJsParams, materialFunctions, assets } = useDefaultConfig();
  return useCallback((sceneId: string) => {
    const currentSceneParams = OldConfigSceneParams[sceneId];
    if (currentSceneParams) {
      return currentSceneParams;
    }
    const sceneParams = Scenes[sceneId]();
    return {
      threeJsParams,
      materialFunctions,
      assets,
      ...sceneParams,
    };
  }, []);
};
