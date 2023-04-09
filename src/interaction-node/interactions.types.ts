import { InteractiveScene } from "visual/components/interactive-scene";
import {
  DATA_TRANSFORM_TYPE,
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
};

export type InteractionEventConfig = {
  key: string;
  // TOOD - TYPE DETAILS
  onEvent: (scene: InteractiveScene, details: any) => void;
};
