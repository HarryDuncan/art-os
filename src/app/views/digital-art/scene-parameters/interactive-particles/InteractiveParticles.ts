import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { TweenLite } from "gsap/all";
import { materialParams } from "./materialParams";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";

export const interactiveParticles = {
  threeJsParams: {
    camera: {
      ...defaultCameraParams,
      position: { x: 0, y: 0, z: 300 },
    },
    renderer: {
      rendererType: RendererTypes.WEBGL,
      size: { width: 800, height: 800 },
      clearColor: 0x000000,
      alpha: 0,
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_EYE as InteractionKey,
      eventFunction: (material: InteractiveMaterial, details) => {
        material.uniforms.uTouchRef.value.addTouch(details);
        material.uniforms.uTouchRef.value.update();
      },
    },
  ],
  assets: [
    {
      name: "image",
      url: "../assets/textures/zz.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParams,
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      if (material.isRunningThread) {
        TweenLite.fromTo(
          material.uniforms.uSize,
          1.0,
          { value: 0.5 },
          { value: 1.5 }
        );
        TweenLite.to(material.uniforms.uRandom, 1.0, {
          value: 2.0,
        });
        TweenLite.fromTo(
          material.uniforms.uDepth,
          1.0 * 1.5,
          { value: 40.0 },
          { value: 4.0 }
        );
        material.isRunningThread = false;
      }
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};
