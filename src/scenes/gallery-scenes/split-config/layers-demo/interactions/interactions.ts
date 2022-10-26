import { InteractiveMaterialType } from "scenes/gallery-scenes/types";
import { Vector2 } from "three";
import { smoothStepTo } from "visual/helpers/animation/smooth-step/smoothStep";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import { EventKey, InteractionKey } from "visual/helpers/interactions/types";

export const interactionEvents = [
  {
    eventKey: EventKey.Position,
    interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
    eventFunction: (material: InteractiveMaterialType, details) => {
      if (material.animationProperties.smoothStep) {
        const { smoothStep } = material.animationProperties;
        const { x, y } = details;
        if (smoothStep.currentStep === null) {
          smoothStep.currentStep = x;
        }
        const newValue = smoothStepTo(smoothStep);
        material.animationProperties.smoothStep.currentStep = newValue;

        if (
          newValue > smoothStep.stepTo + smoothStep.stepSize * 5 ||
          newValue < smoothStep.stepTo - smoothStep.stepSize * 5
        ) {
          material.uniforms.uPosition.value = new Vector2(newValue, y);
        } else {
          material.animationProperties.smoothStep.stepTo = newValue;
        }

        if (Math.abs(x - smoothStep.stepTo) > 40) {
          material.animationProperties.smoothStep.stepTo = x;
        }
      }
    },
  },
];
