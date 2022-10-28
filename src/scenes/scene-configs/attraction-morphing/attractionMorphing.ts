import { Vector2 } from "three";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { AssetType } from "visual/hooks/use-assets/types";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-shader/InteractiveShader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";
import { formatSceneData } from "./formatSceneData";

export const attractionMorphing = () => ({
  threeJsParams: {
    camera: { position: { x: 0, y: 10, z: 30 } },
  },

  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      binding: Binding.InteractiveMesh,
      eventFunction: (material: InteractiveShader, details) => {
        const point = new Vector2(
          details.xAsScale * 2 - 1,
          details.yAsScale * 2 - 1
        );
        material.uniforms.uPosition.value = point;
      },
    },
  ],
  assets: [
    {
      name: "geometry",
      url: "../assets/models/AresBust.obj",
      assetType: AssetType.Geometry,
    },
    {
      name: "matcap",
      url: "../assets/textures/obsidian.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniforms.uFrame.value += 1;
    },
  },
  formatSceneData: formatSceneData,
  sceneFunctions: {
    onTimeUpdate: (scene: InteractiveScene) => {
      const group = scene.children[0];
      if (group) {
        group.rotation.y += 0.002;
      }
    },
  },
  visualComponentConfig: {
    backgroundColor: "white",
  },
});
