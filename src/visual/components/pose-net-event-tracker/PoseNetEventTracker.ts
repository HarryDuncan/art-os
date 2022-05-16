import { ev } from "visual/hooks/use-events/useEvents";
import { MovementPosition } from "visual/hooks/use-pose-net/types";
import { POSENET_SWIPE_EVENT } from "./consts";
import { getXDelta } from "./functions";
import { AdvancedEventKey, PoseNetAdvancedEvent, Step } from "./types";

export class PoseNetEventTracker {
  steps: Step[];
  scoreThreshold: number;
  advancedEvents: AdvancedEventKey[];
  maxStepTimeMilis: number;
  constructor(
    threshold: number,
    eventsToTrack: AdvancedEventKey[],
    maxStepTimeMilis: number = 1000
  ) {
    this.steps = [];
    this.scoreThreshold = threshold;
    this.advancedEvents = eventsToTrack;
    this.maxStepTimeMilis = maxStepTimeMilis;
  }

  addPoint(point: MovementPosition) {
    const { position, score, timeStamp } = point;
    //@ts-ignore
    if (
      score > this.scoreThreshold &&
      (!this.steps.length ||
        timeStamp - this.steps[this.steps.length - 1].timeStamp > 100)
    ) {
      this.steps = this.steps.filter(
        (step) => timeStamp - step.timeStamp < this.maxStepTimeMilis
      );
      this.steps.push({ position, timeStamp: timeStamp });

      if (this.steps.length > 4) {
        this.advancedEvents.forEach((eventType: AdvancedEventKey) => {
          switch (eventType) {
            case POSENET_SWIPE_EVENT.LEFT:
            case POSENET_SWIPE_EVENT.RIGHT:
              this.trackForHorizontalSwipeEvents();
            case POSENET_SWIPE_EVENT.UP:
            case POSENET_SWIPE_EVENT.DOWN:
              this.trackForVerticalSwipeEvents();
              break;
          }
        });
      }
    }
  }

  trackForHorizontalSwipeEvents() {
    const xMovement = getXDelta(this.steps);
    if (
      xMovement > 150 &&
      this.advancedEvents.includes(
        POSENET_SWIPE_EVENT.RIGHT as AdvancedEventKey
      )
    ) {
      ev(POSENET_SWIPE_EVENT.RIGHT);
    }
    if (
      xMovement < -150 &&
      this.advancedEvents.includes(POSENET_SWIPE_EVENT.LEFT as AdvancedEventKey)
    ) {
      ev(POSENET_SWIPE_EVENT.LEFT);
    }
  }
  trackForVerticalSwipeEvents() {}
}
