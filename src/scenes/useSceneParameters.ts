import { useMemo } from "react";
import * as setUpScenes from "./set-up-scene-parameters";
import { useInteractions } from "interaction/external/useInteractions";
import { useSceneData } from "visual/set-up/config/useSceneData";
import { defaultScene } from "./set-up-scene-parameters/default";
import { useConfigData } from "./useConfigData";
import { useAssets } from "visual/set-up/assets/useAssets";

export const useSceneParameters = () => {
  const { configData, configId } = useConfigData();
  const { areAssetsInitialized, initializedAssets } = useAssets(
    configData?.assets
  );
  const setInteractions = useInteractions(configData?.interactionConfig ?? []);
  const sceneData = useSceneData(
    configData,
    initializedAssets,
    areAssetsInitialized
  );
  return useMemo(() => {
    if (!configId || !sceneData) return null;
    const sceneParams = setUpParams(configId, configData, sceneData);
    if (sceneParams.interactionEvents) {
      setInteractions(sceneParams.interactionEvents);
    }
    return {
      assets: initializedAssets,
      ...sceneParams,
    };
  }, [configId, initializedAssets, sceneData]);
};

const setUpParams = (configId, configData, sceneData) => {
  const setUpFunction = setUpScenes[configId];
  if (setUpFunction) {
    return setUpFunction(configData, sceneData);
  }
  console.warn(`setup function does not exist for ${configId}`);
  return defaultScene(configData, sceneData);
};
