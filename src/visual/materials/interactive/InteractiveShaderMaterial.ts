import { InteractionEventConfig } from "interaction-node/interactions.types";
import { Clock, ShaderMaterial } from "three";

// import { UPDATE_TIME_UNIFORM } from "scenes/default-configs/material-functions";

export default class InteractiveShaderMaterial extends ShaderMaterial {
  clock: Clock;

  isRunningThread: boolean;

  constructor(uniforms, vertexShader, fragmentShader) {
    super({
      uniforms,
      vertexShader,
      fragmentShader,
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
    this.clock = new Clock();
  }

  continueThread() {
    this.isRunningThread = !this.isRunningThread;
  }
  addInteractionsEvents(interactionEvents: InteractionEventConfig[]) {
    interactionEvents.forEach(({ key, onEvent }) => {
      document.addEventListener(key, (e) => {
        // TODO - TYPE e
        const { detail } = e as any;

        onEvent(this as InteractiveShaderMaterial, detail);
      });
    });
  }
  startThread() {
    setTimeout(() => {
      this.isRunningThread = true;
    }, 100);
  }
}
