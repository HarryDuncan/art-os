import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { AssetType } from "visual/hooks/use-assets/types";
import { getGooeyShaderSceneData } from "./gooeyShaderSceneData";

export const gooeyShader = () => ({
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
          x: window.innerWidth * details.xAsScale,
          y: window.innerHeight * (1 - details.yAsScale),
        };

        material.uniforms.uPosition.value = point;
      },
    },
  ],
  formatSceneData: getGooeyShaderSceneData,
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

  materialFunctions: {
    onTimeUpdate: (material: InteractiveShader) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniformsNeedUpdate = true;
    },
  },
});
