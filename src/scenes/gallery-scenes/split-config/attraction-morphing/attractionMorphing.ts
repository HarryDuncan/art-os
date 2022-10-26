import { Vector2 } from "three";
import { InteractiveShader } from "visual/components/interactive-shaders/interactive-shader";
import { AssetType } from "visual/hooks/use-assets/types";
import InteractiveMaterial from "visual/components/interactive-shaders/interactive-shader/InteractiveShader";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import { defaultCameraParams } from "visual/hooks/use-three-js/use-camera/useCamera";
import { attractionMorphingFrag } from "visual/shaders/fragment-shaders";
import { attractionMorphingVertex } from "visual/shaders/vertex-shaders";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";

export const attractionMorphing = () => ({
  threeJsParams: {
    camera: { ...defaultCameraParams, position: { x: 0, y: 10, z: 30 } },
  },

  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.RIGHT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveShader, details) => {
        const point = {
          x: details.xAsScale * 2 - 1,
          y: details.yAsScale * 2 - 1,
        };
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
        value: new Vector2(0, 0),
      },
      uMouse: {
        type: "v2",
        value: new Vector2(
          0.7 * window.innerWidth,
          window.innerHeight
        ).multiplyScalar(window.devicePixelRatio),
      },
    },
    shaders: {
      vertexShader: attractionMorphingVertex,
      fragmentShader: attractionMorphingFrag,
    },
  },
  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
      material.uniforms.uFrame.value += 1;
    },
  },
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
