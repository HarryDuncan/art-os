import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EventConfig } from "visual/hooks/use-events/events.types";
import { AnimationManager } from "../../../animation/animation-manager/AnimationManager";
import { defaultInteractiveSceneFunctions } from "./interactiveScene.constants";
import { InteractiveSceneFunctions } from "./types";
import { CustomAnimationConfig } from "visual/animation/animation.types";

export class InteractiveThreeScene extends Scene {
  clock: Clock;

  sceneFunctions: InteractiveSceneFunctions;

  animationManager: AnimationManager;

  orbitControls: OrbitControls | null;

  constructor(
    sceneFunctions: InteractiveSceneFunctions = defaultInteractiveSceneFunctions
  ) {
    super();
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindMainFunctionFunctions();
    this.orbitControls = null;
    this.animationManager = new AnimationManager();

    // interactions.forEach(({ eventKey }) => {
    //   document.addEventListener(`${eventKey}`, (ev) =>
    //     this.onGestureEvent(ev as CustomEvent)
    //   );
    // });
  }

  bindMainFunctionFunctions() {
    document.addEventListener("scene:update", () =>
      this.sceneFunctions.onTimeUpdate(this)
    );
  }

  onGestureEvent(event: CustomEvent) {
    const { type, detail } = event;
    // const currentAction = this.interactions.find(
    //   (interactionEvent) => interactionEvent.eventKey === type
    // );

    // if (currentAction?.eventFunction) {
    //   currentAction.eventFunction(this, detail);
    // }
  }
  addInteractionEvents(interactionEvents) {
    interactionEvents.forEach(({ key, onEvent }) => {
      document.addEventListener(key, (e) => {
        const { detail } = e;
        onEvent(this, detail);
      });
    });
  }

  addEvents(eventConfig: EventConfig[]) {
    eventConfig.forEach(({ eventKey, eventFunction }) => {
      document.addEventListener(eventKey, (e) => eventFunction(this, e));
    });
  }

  addAnimations(animations: CustomAnimationConfig[]) {
    this.animationManager.initializeAnimations(animations);
  }

  addOrbitControls(orbitControls: OrbitControls | null) {
    if (orbitControls) {
      this.orbitControls = orbitControls;
    }
  }
}
