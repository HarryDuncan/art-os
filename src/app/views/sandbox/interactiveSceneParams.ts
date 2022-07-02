import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import { InteractiveScenes } from "visual/components/interactive-material/types";
import InteractiveMaterial from "visual/components/interactive-material/InteractiveMaterial";
import { TweenLite } from "gsap/all";

export const picturePoint = {
  threeJsParams: {
    camera: {
      position: { x: 0, y: 0, z: 300 },
      fov: 100,
      aspect: 1,
      near: 1,
      far: 1080,
    },
    renderer: {
      size: { width: 800, height: 800 },
      clearColor: 0x000000,
      alpha: 0,
    },
  },
  interactionEvents: [
    {
      eventKey: EventKey.Scale,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial, details) => {
        material.uniforms.uTouchRef.value.addTouch(details);
        material.uniforms.uTouchRef.value.update();
        // details.forEach(element => {
        // });
      },
    },
  ],
  assets: [
    {
      name: "image",
      url: "../assets/textures/Marsh.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParamType: InteractiveScenes.INTERACTIVE_PARTICLES,
  materialFunctions: {
    onInitialize: (material: InteractiveMaterial) => {},
    onTimeUpdate: (material: InteractiveMaterial) => {
      if (material.isRunningThread) {
        TweenLite.fromTo(
          material.uniforms.uSize,
          1.0,
          { value: 0.5 },
          { value: 1.5 }
        );
        TweenLite.to(material.uniforms.uRandom, 1.0, {
          value: 2.0,
        });
        TweenLite.fromTo(
          material.uniforms.uDepth,
          1.0 * 1.5,
          { value: 40.0 },
          { value: 4.0 }
        );
        material.isRunningThread = false;
      }
      const delta = material.clock.getDelta();
      material.uniforms.uTime.value += delta;
    },
  },
};
