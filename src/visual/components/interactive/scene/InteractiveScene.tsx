import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { EventConfig } from "visual/hooks/use-events/events.types";
import { AnimationManager } from "../../animation-manager/AnimationManager";
import { CustomAnimation } from "../../animation-manager/animationManager.types";
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

  animationManager: AnimationManager;

  orbitControls: OrbitControls | null;

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
    this.orbitControls = null;
    this.animationManager = new AnimationManager();
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

  addEvents(eventConfig: EventConfig[]) {
    eventConfig.forEach(({ eventKey, eventFunction }) => {
      document.addEventListener(eventKey, (e) => eventFunction(this, e));
    });
  }

  addAnimations(animations: CustomAnimation[]) {
    this.animationManager.initializeAnimations(animations);
  }

  addOrbitControls(orbitControls: OrbitControls | null) {
    if (!!orbitControls) {
      this.orbitControls = orbitControls;
    }
  }
}
