import { useMemo } from "react";
import { useDefaultConfig } from "scenes/default-configs/useDefaultConfig";
import { deepMergeObjects } from "utils/deepMergeObjects";
import { useAppSelector } from "app/redux/store";
import * as setUpScenes from "./set-up-scene-parameters";
import { useInteractions } from "interaction-node/useInteractions";
import { useAssets } from "visual/set-up/assets/use-assets/useAssets";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";

export const useSceneData = () => {
  const { configId, configuredScenes } = useAppSelector(
    (state) => state.sceneData
  );

  // TODO - create progress state to see at what stage of initialization we're at
  const selectedScene = configuredScenes.find(
    (scene) => scene.configId === configId
  );
  const selectedSceneFilePath = selectedScene?.configPath ?? "";
  const sceneConfigData = useFetchConfig(
    `config/${selectedSceneFilePath}.json`
  );
  const configData = sceneConfigData[0] ?? {};
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
      if (sceneParams.interactionEvents) {
        setInteractions(sceneParams.interactionEvents);
      }

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
