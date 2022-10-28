import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import defaultComponentConfiguration from "../../config/visualComponentConfig.json";
import defaultEventConfiguration from "../../config/eventsConfig.json";
import { EventConfig, VisualComponentConfig } from "./types";
import { Layer } from "visual/components/layers/types";

export type VisualState = {
  visualComponentConfig: VisualComponentConfig;
  eventConfiguration: EventConfig;
  layers: Layer[];
  visualData: any;
};

export const INITIAL_STATE: VisualState = {
  visualComponentConfig: defaultComponentConfiguration,
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
