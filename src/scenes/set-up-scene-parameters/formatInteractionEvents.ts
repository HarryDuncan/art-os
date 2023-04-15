import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";
import {
  InteractionConfig,
  InteractionEventConfig,
  Interactive,
} from "interaction-node/interactions.types";
import { Vector2, Vector3 } from "three";
import InteractiveShaderMaterial from "visual/materials/interactive/InteractiveShaderMaterial";
import { eulerToDegrees } from "visual/helpers/conversion/euelerToDegrees";

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
  console.log(eventDetails);
  if (eventDetails.length === 0) {
    material.uniforms.uPosition.value = new Vector3(-2000, -2000, -2000);
  } else {
    const x = getValueFromPercentage(eventDetails[0].x, -20, 20);
    const y = getValueFromPercentage(eventDetails[0].y, -30, 40);

    const multipler = Math.cos(material.uniforms.uRotation.value);

    material.uniforms.uPosition.value = new Vector3(x, y, multipler);
    console.log(eventDetails[0]);
    // console.log(`x :${x}, y : ${y}`);
  }

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
