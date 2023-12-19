import { useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { SceneConfigType } from "visual/set-up/config/config.constants";
import { SceneConfig } from "visual/set-up/config/config.types";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";

export const useConfigData = (sceneConfigId: string) => {
  const { sceneIndex } = useAppSelector((state) => state.sceneData);
  const selectedSceneConfig = useSceneConfig(sceneConfigId);
  const selectedSceneFilePath = selectedSceneConfig?.configPath ?? "";
  const configPath = selectedSceneFilePath
    ? `config/${selectedSceneFilePath}.json`
    : "";
  const sceneConfigData = useFetchConfig(configPath);
  const configData = useMasterSceneData(sceneIndex, sceneConfigData);
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

const useMasterSceneData = (
  sceneIndex: number,
  sceneConfigData: SceneConfig[] | undefined
) =>
  useMemo(() => {
    if (!sceneConfigData) return null;
    const master = sceneConfigData.find(
      ({ sceneConfigType }) => sceneConfigType === SceneConfigType.Master
    );
    const selectedScene = sceneConfigData[sceneIndex];
    if (master && selectedScene) {
      return { ...master, ...selectedScene };
    }
    if (selectedScene) {
      return selectedScene;
    }
    console.warn(`error retrieving scene config at index ${sceneIndex}`);
    return sceneConfigData[0];
  }, [sceneConfigData, sceneIndex]);
