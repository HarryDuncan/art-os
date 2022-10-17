import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { sRGBEncoding, Vector2 } from "three";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";
import { UniformTypes } from "visual/shaders/types";
import { smoothStepTo } from "visual/helpers/animation/smooth-step/smoothStep";

export const deepWaves = {
  threeJsParams: {
    camera: {
      ...defaultCameraParams,
      position: { x: 0, y: 0, z: 2 },
    },
    renderer: {
      rendererType: RendererTypes.WEBGL,
      outputEncoding: sRGBEncoding,
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Position,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial, details) => {
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
  ],
  assets: [],
  materialParams: {
    shaderName: "deepWavesFrag",
    uniformDefinition: [
      { uniformName: "uPosition", uniformType: UniformTypes.Vec2 },
    ],
  },
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};
