import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InteractionConfig } from "interaction/interactions.types";

export type InteractionNodeState = {
  isInitialized: boolean;
  isAlgorithmInitialized: boolean;
  algorithmType: any;
  interactionEvents: InteractionConfig[];
};

export const INITIAL_STATE: InteractionNodeState = {
  isInitialized: false,
  isAlgorithmInitialized: false,
  algorithmType: null,
  interactionEvents: [],
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
    setInteractionEvents: (
      state,
      { payload }: PayloadAction<{ interactionEvents: any }>
    ) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { reducer, actions } = slice;
