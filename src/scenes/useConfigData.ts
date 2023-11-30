import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";

export const useConfigData = (sceneConfigId: string) => {
  const { sceneIndex } = useAppSelector((state) => state.sceneData);
  const selectedSceneConfig = useSceneConfig(sceneConfigId);
  const selectedSceneFilePath = selectedSceneConfig?.configPath ?? "";
  const configPath = selectedSceneFilePath
    ? `config/${selectedSceneFilePath}.json`
    : "";
  const sceneConfigData = useFetchConfig(configPath);
  const configData = useMemo(() => {
    if (!sceneConfigData) return null;
    const selectedScene = sceneConfigData[sceneIndex];
    if (selectedScene) {
      return selectedScene;
    }
    console.warn(`error retrieving scene config at index ${sceneIndex}`);
    return sceneConfigData[0];
  }, [sceneIndex, sceneConfigData]);

  return configData;
};

const useSceneConfig = (sceneConfigId: string) => {
  const { configuredScenes, defaultScenes } = useAppSelector(
    (state) => state.sceneData
  );
  const defaultScene = defaultScenes.find(
    (scene) => scene.configId === sceneConfigId
  );
  const selectedScene = configuredScenes.find(
    (scene) => scene.configId === sceneConfigId
  );
  return defaultScene ?? selectedScene ?? null;
};
