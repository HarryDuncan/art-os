import { TRIGONOMETRIC_TYPES } from "../../animation.constants";
import { TrigonometricType } from "../../animation.types";

export const updateStepTrigonometrically = (
  currentStep: number,
  angle: number,
  trigFunction: TrigonometricType
): number => {
  switch (trigFunction) {
    case TRIGONOMETRIC_TYPES.SIN:
      return currentStep + Math.sin(angle);
    case TRIGONOMETRIC_TYPES.COS:
      return currentStep + Math.cos(angle);
    case TRIGONOMETRIC_TYPES.TAN:
      return currentStep + Math.tan(angle);
    default:
      throw new Error(`Unsupported trig function: ${trigFunction}`);
  }
};
