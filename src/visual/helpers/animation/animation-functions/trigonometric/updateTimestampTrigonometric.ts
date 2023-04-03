import { TRIGONOMETRIC_TYPES } from "../../animation.constants";
import { TrigonometricType } from "../../animation.types";

export const updateTimeStamp = (
  timestamp: number,
  trigFunction: TrigonometricType
): number => {
  switch (trigFunction) {
    case TRIGONOMETRIC_TYPES.SIN:
      return Math.sin(timestamp);
    case TRIGONOMETRIC_TYPES.COS:
      return Math.cos(timestamp);
    case TRIGONOMETRIC_TYPES.TAN:
      return Math.tan(timestamp);
    default:
      throw new Error(`Unsupported trig function: ${trigFunction}`);
  }
};
