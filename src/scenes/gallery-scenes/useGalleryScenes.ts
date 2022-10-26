import { useCallback } from "react";
import { useDefaultConfig } from "scenes/default-configs/useDefaultConfig";
import { deepMergeObjects } from "utils/deepMergeObjects";
import * as OldConfigSceneParams from "./old-config";
import * as Scenes from "./split-config";

export const useGalleryScenes = () => {
  const {
    threeJsParams,
    materialFunctions,
    assets,
    events,
    interactionEvents,
  } = useDefaultConfig();
  return useCallback((sceneId: string) => {
    const currentSceneParams = OldConfigSceneParams[sceneId];
    if (currentSceneParams) {
      return currentSceneParams;
    }
    const sceneParams = Scenes[sceneId]();

    return {
      materialFunctions,
      assets,
      events,
      interactionEvents,
      ...sceneParams,
      threeJsParams: deepMergeObjects(
        threeJsParams,
        sceneParams.threeJsParams ?? {}
      ),
    };
  }, []);
};
