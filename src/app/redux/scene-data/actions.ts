import { slice } from "./slice";

export const {
  setSelectedConfigId,
  setSceneConfigs,
  setDefaultSceneConfigs,
  setSceneCounts,
  setSceneIndex,
  incrementSceneIndex,
  setScenePlayState,
} = slice.actions;
