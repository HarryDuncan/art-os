import { InteractionEventConfig } from "interaction-node/interactions.types";
import {
  Clock,
  CustomBlending,
  OneMinusSrcAlphaFactor,
  ShaderMaterial,
  SrcAlphaFactor,
} from "three";

// import { UPDATE_TIME_UNIFORM } from "scenes/default-configs/material-functions";

export default class InteractiveShaderMaterial extends ShaderMaterial {
  clock: Clock;

  constructor(uniforms, vertexShader, fragmentShader) {
    super({
      uniforms,
      vertexShader,
      fragmentShader,
      blending: CustomBlending,
      blendSrc: SrcAlphaFactor,
      blendDst: OneMinusSrcAlphaFactor,
      depthTest: false,
      transparent: true,
    });
    this.clock = new Clock();
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
}
