import { useCallback } from "react";
import { useDefaultConfig } from "scenes/default-configs/useDefaultConfig";
import { deepMergeObjects } from "utils/deepMergeObjects";
import * as Scenes from "./scene-configs";

export const useGalleryScenes = () => {
  const {
    threeJsParams,
    materialFunctions,
    assets,
    events,
    interactionEvents,
  } = useDefaultConfig();
  return useCallback((sceneId: string) => {
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
