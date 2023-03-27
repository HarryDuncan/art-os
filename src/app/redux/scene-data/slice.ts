import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SceneState = {
  sceneConfig: {
    configIndex: number;
    configUrl: string;
  };
};

export const INITIAL_STATE: SceneState = {
  sceneConfig: { configIndex: 0, configUrl: "" },
};

export const slice = createSlice({
  name: "scene-data",
  initialState: INITIAL_STATE,
  reducers: {
    setSceneData: (state, { payload }: PayloadAction<any>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
