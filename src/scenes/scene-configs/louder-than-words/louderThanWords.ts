import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { AssetType } from "visual/hooks/use-assets/types";
import { events } from "./events";
import { getSceneData } from "./louderThanWordsSceneData";

export const louderThanWords = () => ({
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

        material.uniforms.uCoverVideo.value.needsUpdate = true;
        material.uniforms.uPosition.value = point;
      },
    },
  ],
  formatSceneData: getSceneData,
  assets: [
    {
      name: "uRevealedImage",
      url: "../assets/textures/Black.jpg",
      assetType: AssetType.Texture,
    },
    {
      name: "uShape",
      url: "../assets/textures/ML.jpg",
      assetType: AssetType.Texture,
    },

    {
      name: "revealedVideo",
      url: "../assets/video/BlueGrad_1.mp4",
      AssetType: AssetType.Video,
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
