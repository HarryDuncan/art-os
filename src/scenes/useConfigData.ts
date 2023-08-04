import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { SceneConfig } from "visual/set-up/config/config.types";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";

export const useConfigData = () => {
  const { configId, configuredScenes } = useAppSelector(
    (state) => state.sceneData
  );

  const selectedScene = configuredScenes.find(
    (scene) => scene.configId === configId
  );
  const selectedSceneFilePath = selectedScene?.configPath ?? "";
  const sceneConfigData = useFetchConfig(
    `config/${selectedSceneFilePath}.json`
  );
  const index = 3;
  const configData = useMemo(() => {
    if (!sceneConfigData) return null;
    const selectedScene = sceneConfigData[index];
    if (selectedScene) {
      return selectedScene;
    }
    console.warn(`error retrieving scene config at index ${index}`);
    return sceneConfigData[0];
  }, [index, sceneConfigData]);

  return { configData, configId };
};
