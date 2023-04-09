import { useMemo } from "react";
import { useDefaultConfig } from "scenes/default-configs/useDefaultConfig";
import { deepMergeObjects } from "utils/deepMergeObjects";
import { useAppSelector } from "app/redux/store";
import { useSceneConfig } from "./useSceneConfig";
import { useAssets } from "utils/assets/use-assets/useAssets";
import * as setUpScenes from "./set-up-scene-parameters";
import { useInteractions } from "interaction-node/useInteractions";

export const useSceneData = () => {
  const { configId } = useAppSelector((state) => state.sceneData);

  // TODO - create progress state to see at what stage of initialization we're at

  const configData = useSceneConfig();
  const { areAssetsInitialized, initializedAssets } = useAssets(
    configData.assets ?? []
  );
  const setInteractions = useInteractions(configData.interactionConfig);

  // TODO - rename to parameters
  const { threeJsParams, assets, events } = useDefaultConfig();

  return useMemo(() => {
    if (configId === null) return null;
    if (areAssetsInitialized) {
      const sceneParams = setUpScenes[configId](configData, initializedAssets);
      setInteractions(sceneParams.interactionEvents ?? []);
      return {
        assets,
        events,
        ...sceneParams,
        threeJsParams: deepMergeObjects(
          threeJsParams,
          sceneParams.threeJsParams ?? {}
        ),
      };
    }
  }, [configId, areAssetsInitialized, initializedAssets]);
};
