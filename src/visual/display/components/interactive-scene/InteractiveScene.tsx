import {
  FormattedInteractionConfig,
  InteractionEvent,
} from "interaction/interactions.types";
import { Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { AnimationManager } from "visual/display/animation/animation-manager/AnimationManager";
import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { EventConfig } from "visual/display/hooks/use-events/events.types";

type InteractiveSceneFunctions = {
  onTimeUpdate: (material: InteractiveScene) => void;
};

export class InteractiveScene extends Scene {
  clock: Clock;

  sceneFunctions: InteractiveSceneFunctions;

  animationManager: AnimationManager;

  orbitControls: OrbitControls | null;

  constructor(sceneFunctions: InteractiveSceneFunctions) {
    super();
    this.sceneFunctions = sceneFunctions;
    this.clock = new Clock();
    this.bindMainFunctionFunctions();
    this.orbitControls = null;
    this.animationManager = new AnimationManager();
  }

  bindMainFunctionFunctions() {
    document.addEventListener("scene:update", () =>
      this.sceneFunctions.onTimeUpdate(this)
    );
  }

  addInteractionEvents(interactionEvents: FormattedInteractionConfig[]) {
    interactionEvents.forEach(({ eventKey, onEvent }) => {
      document.addEventListener(eventKey, (e) => {
        const { detail } = e as InteractionEvent;
        onEvent(this as InteractiveScene, detail);
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
