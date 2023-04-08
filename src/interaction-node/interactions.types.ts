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
