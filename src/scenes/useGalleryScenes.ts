import { useAppSelector } from "app/redux/store";
import { useCallback } from "react";
import { useDefaultConfig } from "scenes/default-configs/useDefaultConfig";
import { deepMergeObjects } from "utils/deepMergeObjects";
import * as Scenes from "./scene-configs";
import scenes from "./scenes.json";
import { SceneConfig } from "./types";

export const useGalleryScenes = () => {
  const {
    threeJsParams,
    materialFunctions,
    assets,
    events,
    interactions,
  } = useDefaultConfig();

  const { sceneConfig } = useAppSelector((state) => state.sceneData);
  return useCallback((sceneId: string) => {
    const sceneData = getSceneData(sceneId);
    if (!sceneData) {
      console.error("incorrect scene id");
      return {};
    }
    const sceneParams = Scenes[sceneId](sceneConfig);
    if (sceneData.sceneId) {
      switch (sceneData.componentId) {
        case "ReactFiberScene":
          return { ...sceneParams };
        default:
          return {
            materialFunctions,
            assets,
            events,
            interactions,
            ...sceneParams,
            threeJsParams: deepMergeObjects(
              threeJsParams,
              sceneParams.threeJsParams ?? {}
            ),
          };
      }
    }
  }, []);
};

const getSceneData = (sceneId): SceneConfig | undefined => {
  const sceneData = scenes.find((scene) => scene.sceneId === sceneId);
  return sceneData;
};
