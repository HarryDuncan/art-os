import { TRIG_FUNCTION_TYPES } from "../../animation.constants";
import { TrigFunctionType } from "../../animation.types";
import { oscillate } from "./oscilate";

export const updateTimeStamp = (
  timestamp: number,
  trigFunction: TrigFunctionType
): number => {
  return oscillate(timestamp, trigFunction, 5000);
};
