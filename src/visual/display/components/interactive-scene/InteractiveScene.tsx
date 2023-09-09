import {
  EventConfig,
  InteractionConfig,
  InteractionEvent,
} from "interaction/interactions.types";
import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnimationManager } from "visual/display/animation/animation-manager/AnimationManager";
import { AnimationConfig } from "visual/display/animation/animation.types";

export type InteractiveSceneFunctions = {
  onTimeUpdate?: (scene: InteractiveScene) => void;
  onTriggeredUpdate?: (scene: InteractiveScene) => void;
};

export type SceneInteraction = InteractionConfig & SceneInteractionEvent;
type SceneInteractionEvent = {
  onEvent: (interactive: InteractiveScene, details: unknown) => void;
};

export class InteractiveScene extends Scene {
  clock: Clock;

  sceneFunctions: InteractiveSceneFunctions;

  animationManager: AnimationManager;

  orbitControls: OrbitControls | null;

  eventsSet: boolean;

  constructor(
    sceneFunctions: InteractiveSceneFunctions,
    eventConfig: EventConfig[],
    animationConfig: AnimationConfig[]
  ) {
    super();
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindExecutionFunctions();
    this.addEvents(eventConfig);
    this.orbitControls = null;
    this.animationManager = new AnimationManager(animationConfig);
    this.eventsSet = false;
  }

  bindExecutionFunctions() {
    console.log(this.sceneFunctions);
    const { onTimeUpdate, onTriggeredUpdate } = this.sceneFunctions;
    if (onTimeUpdate) {
      console.log("adding on time update");
      document.addEventListener("scene:update", () => onTimeUpdate(this));
    }
    if (onTriggeredUpdate) {
      document.addEventListener("scene:update-triggered", () =>
        onTriggeredUpdate(this)
      );
    }
  }

  addInteractionEvents(interactionEvents: SceneInteraction[]) {
    interactionEvents.forEach(({ eventKey, onEvent }) => {
      document.addEventListener(eventKey, (e) => {
        const { detail } = e as InteractionEvent;
        onEvent(this as InteractiveScene, detail);
      });
    });
  }

  addEvents(eventConfig: EventConfig[]) {
    if (!this.eventsSet) {
      eventConfig.forEach(({ eventKey, eventFunction }) => {
        switch (eventKey) {
          case "scroll":
            this.addOnScrollListener(eventFunction);
            break;
          default:
            window.addEventListener(eventKey, (e) => {
              eventFunction(this, e);
            });
        }
      });
    }
  }

  addOnScrollListener(eventFunction: (scene: Scene, event: Event) => void) {
    window.addEventListener("scroll", (e) => {
      const { scrollY } = window;
      const event = { ...e, scrollY };
      eventFunction(this, event);
    });
  }

  addAnimations(animations: AnimationConfig[]) {
    this.animationManager.initializeAnimations(animations);
  }

  addOrbitControls(orbitControls: OrbitControls | null) {
    if (orbitControls) {
      this.orbitControls = orbitControls;
    }
  }
}
