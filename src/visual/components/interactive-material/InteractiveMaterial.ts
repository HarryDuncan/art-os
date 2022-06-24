import { Clock, DoubleSide, RawShaderMaterial } from "three";
import { InteractionEventObject } from "visual/hooks/use-interactions/types";
import { InteractiveShaders } from "../../hooks/use-interactive-material/types";
import { defaultInteractiveMaterialFunctions } from "./interactiveMaterialConstants";
import { InteractiveMaterialFunctions } from "./types";

export default class InteractiveMaterial extends RawShaderMaterial {
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
      vertexShader: shaders.vertexShader.vert,
      fragmentShader: shaders.fragmentShader.frag,
      transparent: true,
      side: DoubleSide,
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
