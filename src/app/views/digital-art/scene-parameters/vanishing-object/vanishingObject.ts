import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import { vanishingObjectMaterialParams } from "./materialParams";
import gsap from "gsap";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";

export const vanishingObject = {
  threeJsParams: {
    camera: { ...defaultCameraParams, position: { x: 0, y: 30, z: 105 } },
    renderer: {
      rendererType: RendererTypes.WEBGL,
      size: { width: 800, height: 800 },
      clearColor: 0x000000,
      alpha: 0,
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.SwipeUp,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial) => {
        material.uniforms.delta.value = material.uniforms.delta.value * -1;
        material.isRunningThread = true;
      },
    },
    {
      eventKey: EventKey.SwipeDown,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial) => {
        material.uniforms.delta.value = material.uniforms.delta.value * -1;
        material.isRunningThread = true;
      },
    },
  ],
  assets: [
    {
      name: "geometry",
      url: "../assets/models/ZeusBust.obj",
      assetType: AssetType.Geometry,
    },
    {
      name: "matcap",
      url: "../assets/textures/obsidian.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParams: vanishingObjectMaterialParams,

  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      if (material.isRunningThread) {
        material.uniforms.time.value += material.clock.getDelta();
        gsap.to(material.uniforms.progress, {
          value:
            material.uniforms.progress.value + material.uniforms.delta.value,
          ease: "power4.out",
          duration: 1.2,
          overwrite: true,
        });

        // Change direction
        if (
          (material.uniforms?.progress.value > 1.0 &&
            material.uniforms.delta.value > 0) ||
          (material.uniforms.progress.value < 0 &&
            material.uniforms.delta.value < 0)
        ) {
          material.isRunningThread = false;
        }
      }
    },
  },
};
