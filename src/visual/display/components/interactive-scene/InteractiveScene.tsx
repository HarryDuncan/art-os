import {
  EventConfig,
  InteractionConfig,
  InteractionEvent,
} from "interaction/interactions.types";
import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnimationManager } from "visual/display/animation/animation-manager/AnimationManager";
import { CustomAnimationConfig } from "visual/display/animation/animation.types";

export type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
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
    eventConfig: EventConfig[]
  ) {
    super();
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindMainFunctionFunctions();
    this.addEvents(eventConfig);
    this.orbitControls = null;
    this.animationManager = new AnimationManager();
    this.eventsSet = false;
  }

  bindMainFunctionFunctions() {
    document.addEventListener("scene:update", () =>
      this.sceneFunctions.onTimeUpdate(this)
    );
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
        }
        const existingListener = window[eventKey];
        window.removeEventListener(eventKey, existingListener);

        window.addEventListener(eventKey, (e) => {
          const s = window.scrollY;
          const event = { ...e, s };
          eventFunction(this, event);
        });
      });
      this.eventsSet = true;
    }
  }

  addOnScrollListener(eventFunction) {
    window.addEventListener("scroll", (e) => {
      const { scrollY } = window;
      const event = { ...e, scrollY };
      eventFunction(this, event);
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
