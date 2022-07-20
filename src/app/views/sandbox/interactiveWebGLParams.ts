import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import {
  InteractiveScenes,
  InteractiveShaderTypes,
} from "visual/components/interactive-shaders/types";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-raw-shader/InteractiveRawShader";
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
        const maxs = 12;
        const d = details.xAsScale > 0 ? details.xAsScale : 0;
        material.uniforms.uReflectionCount.value =
          Number(Math.floor(maxs * d).toFixed(2)) + 0.1;
      },
    },
  ],
  assets: [
    {
      name: "uChannel0",
      url: "../assets/textures/Marsh.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParams: {
    sceneType: InteractiveScenes.INTERACTIVE_WEBGL,
    shaderType: InteractiveShaderTypes.SHADER,
    shaderName: "interactiveDisplacementFrag",
    uniformDefinition: [
      {
        uniformName: "uChannel0",
        uniformType: UniformTypes.sampler2D,
        type: "t",
      },
      { uniformName: "uReflectionCount", uniformType: UniformTypes.Float },
    ],
  },
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};
