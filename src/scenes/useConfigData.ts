import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";

export const useConfigData = (sceneConfigId?: string) => {
  const { configId, configuredScenes } = useAppSelector(
    (state) => state.sceneData
  );
  const selectedConfigId = useMemo(() => sceneConfigId ?? configId, []);

  const selectedScene = configuredScenes.find(
    (scene) => scene.configId === selectedConfigId
  );
  const selectedSceneFilePath = selectedScene?.configPath ?? "";
  const configPath = selectedSceneFilePath
    ? `config/${selectedSceneFilePath}.json`
    : "";
  const sceneConfigData = useFetchConfig(configPath);
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

  return { configData, selectedConfigId };
};
