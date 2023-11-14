import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DigitalPiece } from "./types";
import { SceneItem } from "scenes/types";

export type SceneState = {
  configIndex: number;
  sceneIndex: number;
  configId: string | null;
  data: SceneItem | null;
  configuredScenes: DigitalPiece[];
};

export const INITIAL_STATE: SceneState = {
  configIndex: 0,
  sceneIndex: 2,
  configId: null,
  data: null,
  configuredScenes: [],
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
    setSceneConfigs: (state, { payload }: PayloadAction<DigitalPiece[]>) => {
      return {
        ...state,
        configuredScenes: payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
