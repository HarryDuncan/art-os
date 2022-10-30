import { Clock, Scene } from "three";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { defaultInteractiveSceneFunctions } from "./interactiveScene.constants";
import { InteractiveSceneFunctions, SceneObject } from "./types";

export class InteractiveThreeScene extends Scene {
  clock: Clock;

  isRunningThread: boolean;

  interactions: InteractionEventObject[];

  sceneFunctions: InteractiveSceneFunctions;

  sceneParams: any;

  sceneObjects: SceneObject[];

  animationProperties: any;

  constructor(
    interactions: InteractionEventObject[],
    sceneFunctions: InteractiveSceneFunctions = defaultInteractiveSceneFunctions,
    sceneParams: any = {},
    sceneObjects: SceneObject[] = []
  ) {
    super();
    this.isRunningThread = true;
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.interactions = interactions;
    this.sceneParams = sceneParams;
    this.sceneObjects = sceneObjects;
    this.animationProperties = {};
    this.bindMaterialFunctions();
    interactions.forEach(({ eventKey }) => {
      document.addEventListener(`${eventKey}`, (ev) =>
        this.onGestureEvent(ev as CustomEvent)
      );
    });
  }

  bindMaterialFunctions() {
    document.addEventListener("scene:update", () =>
      this.sceneFunctions.onTimeUpdate(this)
    );
  }

  onGestureEvent(event: CustomEvent) {
    const { type, detail } = event;
    const currentAction = this.interactions.find(
      (interactionEvent) => interactionEvent.eventKey === type
    );

    if (currentAction?.eventFunction) {
      currentAction.eventFunction(this, detail);
    }
  }
}
