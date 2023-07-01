import { useMemo } from "react";
import { useAppSelector } from "app/redux/store";
import * as setUpScenes from "./set-up-scene-parameters";
import { useAssets } from "visual/set-up/assets/use-assets/useAssets";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";
import { SceneConfig } from "visual/set-up/config/config.types";
import { useInteractions } from "interaction/external/useInteractions";
import { useSceneData } from "visual/set-up/config/useSceneData";

export const useSceneParameters = () => {
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

  const configData = useSelectedConfig(sceneConfigData);
  const { areAssetsInitialized, initializedAssets } = useAssets(
    configData.assets ?? []
  );
  const setInteractions = useInteractions(configData.interactionConfig ?? []);
  const sceneData = useSceneData(
    configData,
    initializedAssets,
    areAssetsInitialized
  );
  return useMemo(() => {
    if (configId === null || !sceneData) return null;
    const sceneParams = setUpScenes[configId](configData, sceneData);
    if (sceneParams.interactionEvents) {
      setInteractions(sceneParams.interactionEvents);
    }

    return {
      assets: initializedAssets,
      ...sceneParams,
    };
  }, [configId, initializedAssets, sceneData]);
};

const useSelectedConfig = (sceneConfigData: SceneConfig[]) => {
  const index = 3;
  return useMemo(() => {
    const selectedScene = sceneConfigData[index];
    if (selectedScene) {
      return selectedScene;
    }
    console.warn(`error retrieving scene config at index ${index}`);
    return sceneConfigData[0];
  }, [index, sceneConfigData]);
};
