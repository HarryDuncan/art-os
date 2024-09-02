import { slice } from "./slice";

export const {
  setSelectedConfigId,
  setSceneConfigs,
  setDefaultSceneConfigs,
  setSceneCounts,
  setSceneIndex,
  incrementSceneIndex,
  setScenePlayState,
  setWorkspaceId,
  setCustomConfigData,
} = slice.actions;
