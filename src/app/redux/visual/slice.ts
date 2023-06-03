import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import defaultEventConfiguration from "config/eventsConfig.json";
import { EventConfig } from "./types";
import { Layer } from "visual/display/components/layers/types";

export type VisualState = {
  eventConfiguration: EventConfig;
  layers: Layer[];

  visualData: any;
};

export const INITIAL_STATE: VisualState = {
  eventConfiguration: defaultEventConfiguration,
  layers: [],
  visualData: {},
};

export const slice = createSlice({
  name: "visual",
  initialState: INITIAL_STATE,
  reducers: {
    setVisualData: (state, { payload }: PayloadAction<any>) => {
      const layers = payload.layers ?? [];
      return {
        ...state,
        visualData: payload,
        layers,
      };
    },
  },
});

export const { reducer, actions } = slice;
