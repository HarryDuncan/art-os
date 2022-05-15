import { Step } from "./types";

export const getXDelta = (steps: Step[]) => {
  return steps[0].position.x - steps[steps.length - 1].position.x;
};

export const getYDelta = (steps: Step[]) => {
  return steps[0].position.y - steps[steps.length - 1].position.y;
};
