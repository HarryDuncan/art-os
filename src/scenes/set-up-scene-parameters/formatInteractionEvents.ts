import { TweenLite } from "gsap";
import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";
import {
  InteractionConfig,
  InteractionEventConfig,
  Interactive,
} from "interaction-node/interactions.types";
import { Vector3 } from "three";
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
  // console.log(eventDetails);
  if (eventDetails.length === 0 || eventDetails[0].x === -2) {
    material.uniforms.uPower.value -= 0.01;
  } else {
    const x = getValueFromPercentage(eventDetails[0].x, -2, 2);
    const y = getValueFromPercentage(eventDetails[0].y, -10, 10);
    const pos = new Vector3(x, y, 0.0);

    material.uniforms.uPower.value = 1.0;
    slideTo(pos, material);
  }
};

const getValueFromPercentage = (
  percentage: number,
  startValue: number,
  endValue: number
): number => {
  const difference = endValue - startValue;
  const value = startValue + difference * percentage;
  return Number(value.toFixed(2));
};

const slideTo = (targetPosition: Vector3, material) => {
  const startPos = material.uniforms.startPos.value;
  const currentTargetPosition = material.uniforms.targetPosition.value;
  let distance = 0;
  if (currentTargetPosition) {
    const distance = currentTargetPosition.distanceTo(targetPosition);
    console.log(distance);
  }

  const animateMovement = () => {
    const currentPos = material.uniforms.uPosition.value;
    material.uniforms.startPos.value = currentPos;
    material.uniforms.targetPosition.value = targetPosition;
    const startPos = material.uniforms.startPos.value;
    let startTime: number;
    const duration = 800;
    const stepValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const t = progress / duration;
      const x = startPos.x + (targetPosition.x - startPos.x) * t;
      const y = startPos.y + (targetPosition.y - startPos.y) * t;
      const z = 0;
      material.uniforms.uPosition.value = new Vector3(x, y, z);
      if (progress < duration) {
        requestAnimationFrame(stepValue);
      } else {
        material.uniforms.startPos.value = null;
        startTime = 0;
      }
    };

    requestAnimationFrame(stepValue);
  };
  if (!!startPos) {
    return;
  }
  if (distance > 1.5) {
    animateMovement();
  } else if (distance < 1.5 && !startPos) {
    animateMovement();
  }
};
