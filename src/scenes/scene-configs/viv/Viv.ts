import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { getVivSceneData } from "./getVivSceneData";

export const viv = () => ({
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
        const origPoint = material.uniforms.uPosition.value;
        if (Math.abs(origPoint.x - point.x) < 5) {
          point.x = origPoint.x;
        } else if (Math.abs(origPoint.y - point.y) < 5) {
          point.y = origPoint.y;
        }
        material.uniforms.uPosition.value = point;
      },
    },
  ],
  formatSceneData: getVivSceneData,
  assets: [
    {
      name: "uRevealedImage",
      url: "../assets/textures/viv/tartan.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uShape",
      url: "../assets/textures/viv/icon.jpg",
      assetType: ASSET_TYPES.Texture,
    },
    {
      name: "uCoverImage",
      url: "../assets/textures/viv/viv.jpg",
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
});
