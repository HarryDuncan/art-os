import { Vector2 } from "three";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { INTERACTION_EVENTS } from "visual/helpers/interactions/const";
import {
  Binding,
  EventKey,
  InteractionKey,
} from "visual/helpers/interactions/types";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";
import { formatSceneData } from "./scene-data/formatSceneData";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-shader/InteractiveShader";
import { animateAll } from "visual/helpers/animation/animateAll";

export const attractionMorphing2 = () => ({
  threeJsParams: {
    camera: { position: { x: 0, y: 10, z: 30 } },
  },
  interactions: [
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
      assetType: ASSET_TYPES.Geometry,
    },
    {
      name: "matcap",
      url: "../assets/textures/matcaps/green.jpg",
      assetType: ASSET_TYPES.Texture,
    },
  ],
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniforms.uFrame.value += 1;
    },
  },
  formatSceneData,
  sceneFunctions: {
    onTimeUpdate: (_scene: InteractiveScene) => {
      console.warn("not set");
    },
  },
  visualComponentConfig: {
    backgroundColor: "white",
  },
  animations: [
    { animationId: "geometry-rotate", animationFunction: animateAll },
  ],
});
