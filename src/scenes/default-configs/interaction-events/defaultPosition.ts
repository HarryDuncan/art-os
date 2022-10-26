import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";

export const defaultPosition = [
  {
    eventKey: EventKey.Position,
    interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
    eventFunction: (material: InteractiveShader, details) => {
      // material.uniforms.uPosition.value = details;
    },
  },
];
