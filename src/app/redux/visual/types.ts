import {
  InteractionEventObject,
  ModelTypes,
} from "visual/helpers/interactions/types";

export type VisualComponentConfig = typeof import("../../config/visualComponentConfig.json");
export type EventConfig = typeof import("../../config/eventsConfig.json");

// TODO -type visual data
export type VisualData = {
  interactions: InteractionEventObject;
  modelType?: ModelTypes;
};
