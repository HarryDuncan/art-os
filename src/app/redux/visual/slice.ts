import { createSlice } from "@reduxjs/toolkit";
import defaultComponentConfiguration from "../../config/visualComponentConfig.json";
import defaultEventConfiguration from "../../config/eventsConfig.json";
import { EventConfig, VisualComponentConfig } from "./types";
import { Layer, LayerTypes } from "visual/components/layers/types";

export type VisualState = {
  visualComponentConfig: VisualComponentConfig;
  eventConfiguration: EventConfig;
  layers: Layer[];
};

export const INITIAL_STATE: VisualState = {
  visualComponentConfig: defaultComponentConfiguration,
  eventConfiguration: defaultEventConfiguration,
  layers: [
    {
      layerName: "s",
      layerType: LayerTypes.IMAGE,
      layerProps: { src: "Monstruo1.png" },
    },
  ],
};

export const slice = createSlice({
  name: "visual",
  initialState: INITIAL_STATE,
  reducers: {},
});

export const { reducer, actions } = slice;
