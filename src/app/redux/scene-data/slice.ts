import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SceneConfig } from "scenes/types";
import { DigitalPiece } from "./types";

export type SceneState = {
  configIndex: number;
  configId: string | null;
  data: SceneConfig | null;
  configuredScenes: DigitalPiece[];
};

export const INITIAL_STATE: SceneState = {
  configIndex: 0,
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
