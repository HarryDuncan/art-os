import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimatedScene } from "./types";
import { SceneItem } from "scenes/types";

export enum ScenePlayState {
  PAUSE = "PAUSE",
  PLAY = "PLAY",
  STOP = "STOP",
}
export type SceneState = {
  sceneControls: {
    sceneIndex: number;
    sceneCount: number;
    isUsingLastScene: boolean;
    scenePlayState: ScenePlayState;
  };
  selectedConfigId: string | null;
  isEditorEnabled: boolean;
  data: SceneItem | null;
  configuredScenes: AnimatedScene[];
  defaultScenes: AnimatedScene[];
};

export const INITIAL_STATE: SceneState = {
  sceneControls: {
    sceneCount: 0,
    sceneIndex: 0,
    isUsingLastScene: false,
    scenePlayState: ScenePlayState.PLAY,
  },
  isEditorEnabled: false,
  selectedConfigId: null,
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
    setSceneIndex: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        sceneControls: {
          ...state.sceneControls,
          sceneIndex: payload,
          isUsingLastScene: false,
        },
      };
    },
    incrementSceneIndex: (state) => {
      return {
        ...state,
        sceneControls: {
          ...state.sceneControls,
          sceneIndex: state.sceneControls.sceneIndex + 1,
        },
      };
    },
    setSceneCounts: (state, { payload }: PayloadAction<number>) => {
      return {
        ...state,
        sceneControls: {
          ...state.sceneControls,
          sceneCount: payload,
        },
      };
    },
    setScenePlayState: (state, { payload }: PayloadAction<ScenePlayState>) => {
      return {
        ...state,
        sceneControls: {
          ...state.sceneControls,
          scenePlayState: payload,
        },
      };
    },
  },
});

export const { reducer, actions } = slice;
