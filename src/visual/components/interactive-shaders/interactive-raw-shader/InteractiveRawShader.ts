import { Clock, DoubleSide, RawShaderMaterial } from "three";
import { AnimationProperties } from "visual/helpers/animation/animation.types";
import { DEFAULT_SMOOTH_STEP_HELPER } from "visual/helpers/animation/smooth-step/smoothStep";
import { EventConfig } from "visual/hooks/use-events/types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { InteractiveMaterialFunctions, InteractiveShaders } from "../types";
import { UPDATE_TIME_UNIFORM } from "scenes/default-configs/material-functions";

export default class InteractiveRawShader extends RawShaderMaterial {
  clock: Clock;

  isRunningThread: boolean;

  interactionEvents: InteractionEventObject[];

  materialFunctions: InteractiveMaterialFunctions;

  animationProperties: Partial<AnimationProperties>;

  constructor(
    uniforms,
    shaders: InteractiveShaders,
    interactions: InteractionEventObject[],
    materialFunctions: InteractiveMaterialFunctions = UPDATE_TIME_UNIFORM
  ) {
    super({
      vertexShader: shaders.vertexShader.vert,
      fragmentShader: shaders.fragmentShader.frag,
      transparent: true,
      side: DoubleSide,
      defines: {
        PI: Math.PI,
        PR: window.devicePixelRatio.toFixed(1),
      },
    });
    this.isRunningThread = true;
    this.uniforms = uniforms;
    this.materialFunctions = materialFunctions;
    this.clock = new Clock();
    this.interactionEvents = interactions;
    this.animationProperties = { smoothStep: DEFAULT_SMOOTH_STEP_HELPER };
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

  continueThread() {
    this.isRunningThread = !this.isRunningThread;
  }

  addEvents(eventConfig: EventConfig[]) {
    eventConfig.forEach(({ eventKey, eventFunction }) => {
      document.addEventListener(eventKey, (e) => eventFunction(this, e));
    });
  }

  startThread() {
    setTimeout(() => {
      this.isRunningThread = true;
    }, 100);
  }
}
