import { INTERACTION_ALGORITHIMS } from "./interactions.constants";

export type AlgorithimType = keyof typeof INTERACTION_ALGORITHIMS;

export type IntializeAlgorithimConfig = {
  algorithimType: AlgorithimType;
};
