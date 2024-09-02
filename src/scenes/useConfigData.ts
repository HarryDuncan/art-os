import { ROOT } from "app/constants";
import { setSceneCounts } from "app/redux/scene-data/actions";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { useMemo } from "react";
import { deepMergeObjects } from "utils";
import { SceneConfigType } from "visual/set-up/config/config.constants";
import { SceneConfig } from "visual/set-up/config/config.types";
import { useFetchConfig } from "visual/set-up/config/useFetchConfig";

export const useConfigData = (sceneConfigId: string) => {
  const selectedSceneConfig = useSceneConfig(sceneConfigId);
  const selectedSceneFilePath = selectedSceneConfig?.configPath ?? "";
  const configPath = selectedSceneFilePath
    ? `${ROOT}config/${selectedSceneFilePath}.json`
    : "";
  const sceneConfigData = useFetchConfig(configPath);
  const configData = useMasterSceneData(sceneConfigData);
  const mergedConfigData = useMergeCustomConfig(configData);
  return mergedConfigData;
};

const useSceneConfig = (sceneConfigId: string) => {
  const { configuredScenes, defaultScenes } = useAppSelector(
    (state) => state.sceneData
  );
  if (defaultScenes && configuredScenes) {
    const defaultScene = defaultScenes.find(
      (scene) => scene.configId === sceneConfigId
    );
    const selectedScene = configuredScenes.find(
      (scene) => scene.configId === sceneConfigId
    );
    return defaultScene ?? selectedScene ?? null;
  }
  return null;
};

const useMasterSceneData = (sceneConfigData: SceneConfig[] | undefined) => {
  const {
    sceneControls: { sceneIndex, isUsingLastScene },
  } = useAppSelector((state) => state.sceneData);
  const appDispatch = useAppDispatch();
  return useMemo(() => {
    if (!sceneConfigData) return null;
    const master = sceneConfigData.find(
      ({ sceneConfigType }) => sceneConfigType === SceneConfigType.Master
    );
    const selectedIndex = isUsingLastScene
      ? sceneConfigData.length - 1
      : sceneIndex;
    appDispatch(setSceneCounts(sceneConfigData.length - 1));
    const selectedScene = sceneConfigData[selectedIndex];
    if (master && selectedScene) {
      return { ...master, ...selectedScene };
    }
    if (selectedScene) {
      return selectedScene;
    }
    console.warn(`error retrieving scene config at index ${sceneIndex}`);
    return sceneConfigData[0];
  }, [sceneConfigData, sceneIndex, isUsingLastScene]);
};

const useMergeCustomConfig = (sceneConfig: SceneConfig | null) => {
  const { customSceneConfig } = useAppSelector((state) => state.sceneData);
  return useMemo(() => {
    if (!sceneConfig) {
      return null;
    } else {
      return deepMergeObjects(sceneConfig, customSceneConfig);
    }
  }, [customSceneConfig, sceneConfig]);
};
