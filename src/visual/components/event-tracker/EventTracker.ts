import { ev } from "visual/hooks/use-events/useEvents";
import {
  EventKey,
  InteractionEventObject,
} from "visual/hooks/use-interactions/types";
import { getXDelta, getYDelta, trackSteps } from "./functions";
import { Step } from "./types";

const EVENT_REREGISTER_DELAY = 1500;
const DEFAULT_Y_MOVEMENT = 250;

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
    case EventKey.Scale:
      return "trackScale";
    case EventKey.Position:
    default:
      return "trackPosition";
  }
};

export class EventTracker {
  scoreThreshold: number;
  maxStepTimeMilis: number;
  events: EventKey[];
  steps: Step[];
  canRegisterEvent: boolean;
  constructor(
    interactionEventObjs: InteractionEventObject[],
    threshold: number = 0.5,
    maxStepTimeMilis: number = 1000
  ) {
    this.scoreThreshold = threshold;
    this.events = interactionEventObjs.map(({ eventKey }) => eventKey);
    this.maxStepTimeMilis = maxStepTimeMilis;
    this.steps = [];
    this.canRegisterEvent = true;
    interactionEventObjs.forEach(({ eventKey, interactionKey }) => {
      document.addEventListener(`:${interactionKey}`, (ev) =>
        this[getEventFunctionName(eventKey)](ev as CustomEvent)
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
      const yMovement = getYDelta(this.steps);
      if (
        yMovement < -DEFAULT_Y_MOVEMENT &&
        (this.events.includes(EventKey.SwipeVertical) ||
          this.events.includes(EventKey.SwipeDown)) &&
        this.canRegisterEvent
      ) {
        this.temporarilyPauseEventRegistering();
        ev(EventKey.SwipeDown);
      }
      if (
        yMovement > DEFAULT_Y_MOVEMENT &&
        (this.events.includes(EventKey.SwipeVertical) ||
          this.events.includes(EventKey.SwipeUp)) &&
        this.canRegisterEvent
      ) {
        this.temporarilyPauseEventRegistering();
        ev(EventKey.SwipeUp);
      }
    }
  }

  trackPosition(event: CustomEvent) {
    const {
      detail: { position },
    } = event;
    ev(EventKey.Position, position);
  }

  trackScale(event: CustomEvent) {
    const {
      detail: { position },
    } = event;
    ev(EventKey.Scale, {
      xAsScale: position.x / 800,
      yAsScale: position.y / 800,
    });
  }

  // HELPER FUNCTIONS

  temporarilyPauseEventRegistering() {
    this.steps = [];
    this.canRegisterEvent = false;
    setTimeout(() => {
      this.canRegisterEvent = true;
    }, EVENT_REREGISTER_DELAY);
  }
}
//

// addPoint(point: MovementPosition) {
//   const { position, score, timeStamp } = point;
//   //@ts-ignore

//

//     }
//   }
// }
