import { ev } from "visual/hooks/use-events/useEvents";
import {
  EventKey,
  InteractionEventObject,
  InteractionKey,
} from "visual/hooks/use-interactions/types";
import { getXDelta, getYDelta, trackSteps } from "./functions";
import { Step } from "./types";

interface EventTrackerProps {
  threshold: number;
}

interface EventParameters {
  interaction: InteractionKey;
  eventKey: EventKey;
}

const getEventFunctionName = (eventKey: EventKey) => {
  switch (eventKey) {
    case EventKey.SwipeLeft:
    case EventKey.SwipeRight:
    case EventKey.SwipeHorizontal:
      return "trackHorizontalMovement";
    case EventKey.SwipeUp:
    case EventKey.SwipeDown:
    case EventKey.SwipeVertical:
      return "trackVerticalMovement";
    case EventKey.Position:
      return "trackPosition";
    case EventKey.SlideX:
    case EventKey.SlideY:
      return "trackSlide";
  }
};

export class EventTracker {
  scoreThreshold: number;
  maxStepTimeMilis: number;
  events: EventKey[];
  steps: Step[];
  constructor(
    interactionEventObjs: InteractionEventObject[],
    threshold: number = 0.5,
    maxStepTimeMilis: number = 1000
  ) {
    this.scoreThreshold = threshold;
    this.events = interactionEventObjs.map(({ eventKey }) => eventKey);
    this.maxStepTimeMilis = maxStepTimeMilis;
    this.steps = [];
    interactionEventObjs.forEach(({ eventKey, interactionKey }) => {
      document.addEventListener(`:${interactionKey}`, (ev) =>
        this[getEventFunctionName(eventKey)](ev)
      );
    });
  }

  trackHorizontalMovement(event: CustomEvent) {
    const {
      timeStamp,
      detail: { position, score },
    } = event;
    this.steps = trackSteps(
      this.steps,
      this.scoreThreshold,
      this.maxStepTimeMilis,
      score,
      timeStamp,
      position
    );
    if (this.steps.length > 4) {
      const xMovement = getXDelta(this.steps);
      if (
        xMovement > 150 &&
        (this.events.includes(EventKey.SwipeHorizontal) ||
          this.events.includes(EventKey.SwipeRight))
      ) {
        ev(EventKey.SwipeRight);
      }
      if (
        xMovement < -150 &&
        (this.events.includes(EventKey.SwipeHorizontal) ||
          this.events.includes(EventKey.SwipeLeft))
      ) {
        ev(EventKey.SwipeLeft);
      }
    }
  }

  trackVerticalMovement(event: CustomEvent) {
    const {
      timeStamp,
      detail: { position, score },
    } = event;
    this.steps = trackSteps(
      this.steps,
      this.scoreThreshold,
      this.maxStepTimeMilis,
      score,
      timeStamp,
      position
    );
    if (this.steps.length > 4) {
      const xMovement = getYDelta(this.steps);
      if (
        xMovement < -150 &&
        (this.events.includes(EventKey.SwipeVertical) ||
          this.events.includes(EventKey.SwipeDown))
      ) {
        this.steps = [];
        ev(EventKey.SwipeDown);
      }
      if (
        xMovement > 150 &&
        (this.events.includes(EventKey.SwipeVertical) ||
          this.events.includes(EventKey.SwipeUp))
      ) {
        this.steps = [];
        ev(EventKey.SwipeUp);
      }
    }
  }

  // HELPER FUNCTIONS
}
//

// addPoint(point: MovementPosition) {
//   const { position, score, timeStamp } = point;
//   //@ts-ignore

//

//     }
//   }
// }
