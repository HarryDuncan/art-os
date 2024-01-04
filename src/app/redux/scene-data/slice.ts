import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimatedScene } from "./types";
import { SceneItem } from "scenes/types";

export type SceneState = {
  configIndex: number;
  sceneIndex: number;
  isUsingLastScene: boolean;
  configId: string | null;
  data: SceneItem | null;
  configuredScenes: AnimatedScene[];
  defaultScenes: AnimatedScene[];
};

export const INITIAL_STATE: SceneState = {
  configIndex: 0,
  sceneIndex: 3,
  isUsingLastScene: false,
  configId: null,
  data: null,
  configuredScenes: [],
  defaultScenes: [],
};

export const slice = createSlice({
  name: "scene-data",
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedConfigId: (state, { payload }: PayloadAction<string | null>) => {
      return {
        ...state,
        configId: payload,
      };
    },
    setSceneConfigs: (state, { payload }: PayloadAction<AnimatedScene[]>) => {
      return {
        ...state,
        configuredScenes: payload,
      };
    },
    setDefaultSceneConfigs: (
      state,
      { payload }: PayloadAction<AnimatedScene[]>
    ) => {
      return {
        ...state,
        defaultScenes: payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
