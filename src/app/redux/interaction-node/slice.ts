import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type InteractionNodeState = {
  isInitialized: boolean;
  isAlgorithmInitialized: boolean;
  algorithmType: any;
};

export const INITIAL_STATE: InteractionNodeState = {
  isInitialized: false,
  isAlgorithmInitialized: false,
  algorithmType: null,
};

export const slice = createSlice({
  name: "interaction-node",
  initialState: INITIAL_STATE,
  reducers: {
    setInitialization: (
      state,
      { payload }: PayloadAction<{ isInitialized: boolean }>
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
    setAlgorithm: (
      state,
      {
        payload,
      }: PayloadAction<{ algorithmType: any; isAlgorithmInitialized: boolean }>
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
