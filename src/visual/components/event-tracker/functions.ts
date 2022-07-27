import { Step } from './types';

export const getXDelta = (steps: Step[]) => steps[0].position.x - steps[steps.length - 1].position.x;

export const getYDelta = (steps: Step[]) => steps[0].position.y - steps[steps.length - 1].position.y;

export const trackSteps = (
  steps: Step[],
  scoreThreshold: number,
  maxStepTimeMilis: number,
  score: number,
  timeStamp: number,
  position,
) => {
  if (
    score > scoreThreshold
    && (!steps.length || timeStamp - steps[steps.length - 1].timeStamp > 100)
  ) {
    steps = steps.filter(
      (step) => timeStamp - step.timeStamp < maxStepTimeMilis,
    );
    steps.push({ position, timeStamp });
  }
  return steps;
};
