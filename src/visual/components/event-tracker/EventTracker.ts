import { clamp } from "lodash";
import { ev } from "visual/hooks/use-events/useEventsWithMeshes";
import {
  EventKey,
  InteractionEventObject,
} from "visual/helpers/interactions/types";
import { getXDelta, getYDelta, trackSteps } from "./functions";
import { Step } from "./types";

const EVENT_REREGISTER_DELAY = 1500;
const DEFAULT_Y_MOVEMENT = 250;
const SCALE_MINIMUM = 0;
const SCALE_MAXIUM = 1;
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
    case EventKey.MultiplePositions:
      return "trackMultiplePositions";
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
    threshold = 0.9,
    maxStepTimeMilis = 1000
  ) {
    this.scoreThreshold = threshold;
    this.events = interactionEventObjs.map(({ eventKey }) => eventKey);
    this.maxStepTimeMilis = maxStepTimeMilis;
    this.steps = [];
    this.canRegisterEvent = true;
    interactionEventObjs.forEach(({ eventKey, interactionKey }) => {
      document.addEventListener(`:${interactionKey}`, (event) =>
        this[getEventFunctionName(eventKey)](event as CustomEvent)
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

    event.preventDefault();
    event.stopImmediatePropagation();
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
        event.stopPropagation();
        this.temporarilyPauseEventRegistering();
        ev(EventKey.SwipeUp);
      }
    }
  }

  trackPosition(event: CustomEvent) {
    const {
      detail: { position, score },
    } = event;
    if (score > this.scoreThreshold) {
      ev(EventKey.Position, position);
    }
  }

  // Used with body seg model
  trackMultiplePositions(event: CustomEvent) {
    const { detail } = event;
    ev(EventKey.MultiplePositions, detail);
  }

  trackScale(event: CustomEvent) {
    const {
      detail: { position },
    } = event;

    ev(EventKey.Scale, {
      xAsScale: clamp((640 - position.x) / 640, SCALE_MINIMUM, SCALE_MAXIUM),
      yAsScale: clamp((480 - position.y) / 480, SCALE_MINIMUM, SCALE_MAXIUM),
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
