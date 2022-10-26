import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import { EventKey, InteractionKey } from "visual/helpers/interactions/types";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { Vector2 } from "three";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";
import { imageHoverVertex } from "visual/shaders/vertex-shaders";
import { gooeyFragment } from "visual/shaders/fragment-shaders";
import { RendererTypes } from "visual/hooks/use-three-js/renderer/types";

export const imageHoverConfig = {
  threeJsParams: {
    camera: { ...defaultCameraParams, position: { x: 0, y: 0, z: 1 } },
  },
  renderer: {
    rendererType: RendererTypes.WEBGL,
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveShader, details) => {
        const point = {
          x: window.innerWidth * details.xAsScale,
          y: window.innerHeight * (1 - details.yAsScale),
        };

        material.uniforms.uPosition.value = point;
      },
    },
  ],
  assets: [
    {
      name: "uCoverImage",
      url: "../assets/textures/BlockChainSquare.jpg",
      assetType: AssetType.Texture,
    },
    {
      name: "uRevealedImage",
      url: "../assets/textures/HJDBg.jpg",
      assetType: AssetType.Texture,
    },
  ],

  materialParams: {
    uniforms: {
      uAlpha: { value: 1 },
      uCoverImage: { type: "t", value: null },
      uCoverImageRatio: { value: 0 },
      uRevealedImage: { type: "t", value: null },
      uRevealedImageRatio: { value: 0 },
      uShape: { value: 0 },
      uProgressHover: { value: 1.0 },
      uProgressClick: { value: 0 },
      uTime: { value: 0 },
      uPosition: { value: new Vector2(0, 0) },
      uResolution: {
        value: new Vector2(window.innerWidth, window.innerHeight),
      },
    },
    shaders: {
      vertexShader: imageHoverVertex,
      fragmentShader: gooeyFragment,
    },
  },

  materialFunctions: {
    onTimeUpdate: (material: InteractiveShader) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniformsNeedUpdate = true;
    },
  },
};
