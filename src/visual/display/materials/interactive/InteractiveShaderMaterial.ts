import {
  InteractionConfig,
  InteractionEvent,
} from "interaction/interactions.types";
import {
  Clock,
  CustomBlending,
  OneMinusSrcAlphaFactor,
  ShaderMaterial,
  SrcAlphaFactor,
} from "three";

export type ShaderInteraction = InteractionConfig &
  ShaderMaterialInteractionEvent;
type ShaderMaterialInteractionEvent = {
  onEvent: (interactive: InteractiveShaderMaterial, details: unknown) => void;
};
export default class InteractiveShaderMaterial extends ShaderMaterial {
  clock: Clock;

  constructor(
    uniforms: Record<string, unknown>,
    vertexShader: string,
    fragmentShader: string
  ) {
    super({
      // @ts-ignore
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

  addInteractionsEvents(interactionEvents: ShaderInteraction[]) {
    interactionEvents.forEach(({ eventKey, onEvent }) => {
      document.addEventListener(eventKey, (e) => {
        const { detail } = e as InteractionEvent;
        onEvent(this as InteractiveShaderMaterial, detail);
      });
    });
  }
}
