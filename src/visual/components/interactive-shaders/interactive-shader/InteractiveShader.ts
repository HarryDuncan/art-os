import { Clock, ShaderMaterial } from "three";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { defaultInteractiveMaterialFunctions } from "../interactiveMaterialConstants";
import { InteractiveMaterialFunctions, InteractiveShaders } from "../types";

export default class InteractiveShader extends ShaderMaterial {
  clock: Clock;

  isRunningThread: boolean;

  interactionEvents: InteractionEventObject[];

  materialFunctions: InteractiveMaterialFunctions;

  constructor(
    uniforms,
    shaders: InteractiveShaders,
    interactions: InteractionEventObject[],
    materialFunctions: InteractiveMaterialFunctions = defaultInteractiveMaterialFunctions
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
    this.uniforms = uniforms;
    this.materialFunctions = materialFunctions;
    this.clock = new Clock();
    this.interactionEvents = interactions;

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

  startThread() {
    setTimeout(() => {
      this.isRunningThread = true;
    }, 100);
  }
}
