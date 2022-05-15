import {
  Keypoint,
  KeypointPosition,
  MovementPosition,
} from "visual/hooks/use-pose-net/types";

type Step = { position: KeypointPosition; timeStamp: number };
export class PoseNetEventTracker {
  steps: Step[];
  scoreThreshold: number;
  constructor(threshold: number) {
    this.steps = [];
    this.scoreThreshold = threshold;
  }

  addPoint(point: MovementPosition) {
    const { position, score, timeStamp } = point;

    // console.log(`Y: ${position.y}`);
    //@ts-ignore
    if (
      score > this.scoreThreshold &&
      (!this.steps.length ||
        timeStamp - this.steps[this.steps.length - 1].timeStamp > 100)
    ) {
      this.steps = this.steps.filter(
        (step) => timeStamp - step.timeStamp < 1000
      );
      this.steps.push({ position, timeStamp: timeStamp });

      console.log(this.steps);
    }
  }
}
