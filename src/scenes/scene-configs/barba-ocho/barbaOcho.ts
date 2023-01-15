import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { getBarbaOchoSceneData } from "./barbaOchoSceneData";
import { events } from "./events";

export const barbaOcho = () => ({
  threeJsParams: {
    camera: { position: { x: 0, y: 0, z: 2 } },
  },
  interactions: [
    {
      eventKey: EventKey.Scale,
      binding: Binding.InteractiveMesh,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveShader, details) => {
        const point = {
          x: window.innerWidth * 0.5,
          y: window.innerHeight * 0.4,
        };

        material.uniforms.uPosition.value = point;
      },
    },
  ],
  formatSceneData: getBarbaOchoSceneData,
  assets: [
    {
      name: "uRevealedImage",
      url: "../assets/textures/PROMO.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uShape",
      url: "../assets/textures/barbaOcho.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage",
      url: "../assets/textures/b1.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage2",
      url: "../assets/textures/b2.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage2",
      url: "../assets/textures/b3.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage2",
      url: "../assets/textures/b4.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage2",
      url: "../assets/textures/b11.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage2",
      url: "../assets/textures/b6.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage2",
      url: "../assets/textures/b7.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage244",
      url: "../assets/textures/b8.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage244",
      url: "../assets/textures/b9.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage24",
      url: "../assets/textures/b10.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage5",
      url: "../assets/textures/b5.jpg",
      assetType: ASSET_TYPES.Texture,
    },
  ],
  materialFunctions: {
    onTimeUpdate: (material: InteractiveShader) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniformsNeedUpdate = true;
    },
  },
  events,
});
