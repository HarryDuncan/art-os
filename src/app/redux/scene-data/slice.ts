import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SceneConfig } from "scenes/types";
import scenes from "config/scenes.json";
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
  configuredScenes: scenes,
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
  },
});

export const { reducer, actions } = slice;
