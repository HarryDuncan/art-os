import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";
import {
  InteractionConfig,
  InteractionEventConfig,
  Interactive,
} from "interaction-node/interactions.types";
import { ShaderMaterial, Vector2 } from "three";
import { InteractiveScene } from "visual/components/interactive-scene";
import { getMeshByName } from "visual/helpers/scene/object-finding/getMeshByName";
import InteractiveShaderMaterial from "visual/materials/interactive/InteractiveShaderMaterial";

export const formatInteractionEvents = (
  interactionConfigs: InteractionConfig[]
) => {
  return interactionConfigs.map((interactionConfig: InteractionConfig) => {
    const interactionEvent: Partial<InteractionEventConfig> = {
      key: interactionConfig.eventKey,
      bindingType: interactionConfig.bindingType,
    };
    if (interactionConfig.bindingType === EVENT_BINDING_TYPE.MATERIAL) {
      interactionEvent.onEvent = (interactive: Interactive, eventDetails) => {
        updateMaterialTimeUniform(
          interactive as InteractiveShaderMaterial,
          eventDetails
        );
      };
    }
    return interactionEvent as InteractionEventConfig;
  });
};

const updateMaterialTimeUniform = (
  material: InteractiveShaderMaterial,
  eventDetails
) => {
  material.uniforms.uPosition.value = new Vector2(
    eventDetails.x,
    eventDetails.y
  );
  material.uniforms.uTime.value += 0.01;
};
