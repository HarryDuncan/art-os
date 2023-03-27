import { Clock, ShaderMaterial } from "three";
import { EventConfig } from "visual/hooks/use-events/events.types";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import {
  InteractiveMaterialFunctions,
  InteractiveShaders,
} from "../shaders.types";
import { UPDATE_TIME_UNIFORM } from "scenes/default-configs/material-functions";

export default class InteractiveShader extends ShaderMaterial {
  clock: Clock;

  isRunningThread: boolean;

  interactions: InteractionEventObject[];

  materialFunctions: InteractiveMaterialFunctions;

  constructor(
    uniforms,
    shaders: InteractiveShaders,
    interactions: InteractionEventObject[],
    materialFunctions: InteractiveMaterialFunctions = UPDATE_TIME_UNIFORM
  ) {
    super({
      uniforms,
      vertexShader: shaders.vertexShader.vert,
      fragmentShader: shaders.fragmentShader.frag,
      depthWrite: true,
      extensions: {
        derivatives: true,
      },
      defines: {
        PI: Math.PI,
        PR: window.devicePixelRatio.toFixed(1),
      },
    });
    this.isRunningThread = true;

    this.materialFunctions = materialFunctions;
    this.clock = new Clock();
    this.interactions = interactions;
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
    const currentAction = this.interactions.find(
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
