import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnimatedScene } from "./types";
import { SceneItem } from "scenes/types";
import { SceneConfig } from "visual/set-up/config/config.types";

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
  customSceneConfig: Partial<SceneConfig>;
  selectedConfigId: string | null;
  isEditorEnabled: boolean;
  data: SceneItem | null;
  configuredScenes: AnimatedScene[];
  defaultScenes: AnimatedScene[];
  workspaceId: string | null;
};

export const INITIAL_STATE: SceneState = {
  sceneControls: {
    sceneCount: 0,
    sceneIndex: 0,
    isUsingLastScene: false,
    scenePlayState: ScenePlayState.PLAY,
  },
  customSceneConfig: {},
  workspaceId: null,
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
    setWorkspaceId: (state, { payload }: PayloadAction<string | null>) => {
      return {
        ...state,
        workspaceId: payload,
      };
    },
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
    setCustomConfigData: (
      state,
      { payload }: PayloadAction<Partial<SceneConfig>>
    ) => {
      return {
        ...state,
        customSceneConfig: payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
