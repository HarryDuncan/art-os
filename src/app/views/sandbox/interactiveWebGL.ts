import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import { InteractiveScenes } from "visual/components/interactive-material/types";
import InteractiveMaterial from "visual/components/interactive-material/InteractiveMaterial";
import { UniformTypes } from "visual/shaders/types";

export const interactiveWebGL = {
  threeJsParams: {
    camera: {
      position: { x: 0, y: 0, z: 1000 },
      fov: 50,
      aspect: 1,
      near: 1,
      far: 10080,
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial, details) => {
        // details.forEach(element => {
        // });
      },
    },
  ],
  assets: [
    {
      name: "uChannel0",
      url: "../assets/textures/zz.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParams: {
    sceneType: InteractiveScenes.INTERACTIVE_WEBGL,
    shaderName: "interactiveDisplacementFrag",
    uniformDefinition: [
      { uniformName: "uChannel0", uniformType: UniformTypes.sampler2D },
    ],
  },
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};
