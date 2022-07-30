import { Clock, Scene } from "three";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { defaultInteractiveSceneFunctions } from "./interactiveScene.constants";
import { InteractiveSceneFunctions } from "./types";

export class InteractiveScene extends Scene {
  clock: Clock;

  isRunningThread: boolean;

  interactionEvents: InteractionEventObject[];

  materialFunctions: InteractiveSceneFunctions;

  materialParams: any;
  constructor(
    interactions: InteractionEventObject[],
    materialFunctions: InteractiveSceneFunctions = defaultInteractiveSceneFunctions,
    materialParams: any
  ) {
    super();
    this.isRunningThread = true;
    this.materialFunctions = materialFunctions;
    this.clock = new Clock();
    this.interactionEvents = interactions;
    this.materialParams = materialParams;
    this.bindMaterialFunctions();
    interactions.forEach(({ eventKey }) => {
      document.addEventListener(`${eventKey}`, (ev) =>
        this.onGestureEvent(ev as CustomEvent)
      );
    });
  }

  bindMaterialFunctions() {
    document.addEventListener("scene:update", () =>
      this.materialFunctions.onTimeUpdate(this)
    );
  }

  onGestureEvent(event: CustomEvent) {
    const { type, detail } = event;
    const currentAction = this.interactionEvents.find(
      (interactionEvent) => interactionEvent.eventKey === type
    );

    if (currentAction?.eventFunction) {
      currentAction.eventFunction(this, detail);
    }
  }
}
