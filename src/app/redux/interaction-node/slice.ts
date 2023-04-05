import { createSlice } from "@reduxjs/toolkit";

export type InteractionNodeState = {};

export const INITIAL_STATE: InteractionNodeState = {};

export const slice = createSlice({
  name: "interaction-node",
  initialState: INITIAL_STATE,
  reducers: {},
});

export const { reducer, actions } = slice;
