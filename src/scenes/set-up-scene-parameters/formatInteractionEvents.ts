import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";
import {
  InteractionConfig,
  InteractionEventConfig,
  Interactive,
} from "interaction-node/interactions.types";
import { Vector2 } from "three";
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
  const x = getValueFromPercentage(eventDetails.x, -2, 2);
  const y = getValueFromPercentage(eventDetails.y, -1, 1);
  material.uniforms.uPosition.value = new Vector2(x, y);
  material.uniforms.uTime.value += material.clock.getDelta();
};

const getValueFromPercentage = (
  percentage: number,
  startValue: number,
  endValue: number
): number => {
  const difference = endValue - startValue;
  const value = startValue + difference * percentage;
  return value;
};
