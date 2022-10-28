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

        const update = { uPosition: point };
        console.log(material);
        material.updateUniforms(update);
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
  materialParams: {
    uniforms: {
      uTime: {
        type: "f",
        value: 0.0,
      },
      uFrame: {
        type: "f",
        value: 0.0,
      },
      uResolution: {
        type: "v2",
        value: new Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(window.devicePixelRatio),
      },
      matcap: { value: null },
      uPosition: {
        type: "v2",
        value: new Vector2(50, 50),
      },
      uMouse: {
        type: "v2",
        value: new Vector2(
          0.7 * window.innerWidth,
          window.innerHeight
        ).multiplyScalar(window.devicePixelRatio),
      },
    },
  },
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      const currentTime = material.uniforms.uTime.value + delta;
      const currentFrame = material.uniforms.uFrame.value + 1;
      const update = { uTime: currentTime, uFrame: currentFrame };
      material.updateUniforms(update);
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
