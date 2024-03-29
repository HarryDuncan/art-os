import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import {
  DATA_TRANSFORM_TYPE,
  EVENT_BINDING_TYPE,
  INTERACTION_ALGORITHIMS,
} from "./interactions.constants";

export type AlgorithmType = keyof typeof INTERACTION_ALGORITHIMS;
export type DataTransformType = keyof typeof DATA_TRANSFORM_TYPE;

export type IntializeAlgorithmConfig = {
  algorithmType: AlgorithmType;
  dataTransformType: DataTransformType;
};

export type InteractionConfig = IntializeAlgorithmConfig & {
  eventKey: string;
  bindingType?: InteractionEventBinding;
};

export type InteractionEventBinding = keyof typeof EVENT_BINDING_TYPE;
export type Interactive = InteractiveScene;
export type InteractionEventConfig = {
  key: string;
  bindingType?: InteractionEventBinding;
  // TOOD - TYPE DETAILS
  onEvent: (interactive: Interactive, details: any) => void;
};
