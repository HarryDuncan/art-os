import { createSlice } from "@reduxjs/toolkit";
import defaultComponentConfiguration from "../../config/visualComponentConfig.json";
import defaultEventConfiguration from "../../config/eventsConfig.json";
import { EventConfig, VisualComponentConfig } from "./types";

export type VisualState = {
  visualComponentConfig: VisualComponentConfig;
  eventConfiguration: EventConfig;
};

export const INITIAL_STATE: VisualState = {
  visualComponentConfig: defaultComponentConfiguration,
  eventConfiguration: defaultEventConfiguration,
};

export const slice = createSlice({
  name: "visual",
  initialState: INITIAL_STATE,
  reducers: {},
});

export const { reducer, actions } = slice;
