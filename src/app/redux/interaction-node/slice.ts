import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type InteractionNodeState = {
  isInitialized: boolean;
};

export const INITIAL_STATE: InteractionNodeState = {
  isInitialized: false,
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
  },
});

export const { reducer, actions } = slice;
