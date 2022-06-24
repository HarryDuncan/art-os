import { AssetType } from "visual/hooks/use-assets/types";
import { INTERACTION_EVENTS } from "visual/hooks/use-interactions/const";
import { EventKey, InteractionKey } from "visual/hooks/use-interactions/types";
import { InteractiveScenes } from "visual/components/interactive-material/types";
import gsap from "gsap";
import InteractiveMaterial from "visual/components/interactive-material/InteractiveMaterial";

export const vanishingObject = {
  threeJSParams: {
    camera: { position: { x: 0, y: 30, z: 105 } },
  },
  interactions: [
    {
      eventKey: EventKey.SwipeUp,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial) => {
        material.uniforms.delta.value = material.uniforms.delta.value * -1;
        material.isRunningThread = true;
      },
    },
    {
      eventKey: EventKey.SwipeDown,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (material: InteractiveMaterial) => {
        material.uniforms.delta.value = material.uniforms.delta.value * -1;
        material.isRunningThread = true;
      },
    },
  ],
  assets: [
    {
      name: "geometry",
      url: "../assets/models/ZeusBust.obj",
      assetType: AssetType.Geometry,
    },
    {
      name: "matcap",
      url: "../assets/textures/obsidian.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParamType: InteractiveScenes.VANISHING_OBJECT,

  materialFunctions: {
    onTimeUpdate: (material: InteractiveMaterial) => {
      if (material.isRunningThread) {
        material.uniforms.time.value += material.clock.getDelta();
        gsap.to(material.uniforms.progress, {
          value:
            material.uniforms.progress.value + material.uniforms.delta.value,
          ease: "power4.out",
          duration: 1.2,
          overwrite: true,
        });

        // Change direction
        if (
          (material.uniforms?.progress.value > 1.0 &&
            material.uniforms.delta.value > 0) ||
          (material.uniforms.progress.value < 0 &&
            material.uniforms.delta.value < 0)
        ) {
          material.isRunningThread = false;
        }
      }
    },
  },
};

export const picturePoint = {
  threeJSParams: {
    camera: { position: { x: 0, y: 0, z: 300 } },
    renderer: {
      size: { width: 800, height: 800 },
      clearColor: 0x000000,
      alpha: 0,
    },
  },
  interactions: [
    {
      eventKey: EventKey.Position,
      interactionKey: INTERACTION_EVENTS.POSENET.LEFT_WRIST as InteractionKey,
      eventFunction: (_: InteractiveMaterial, details) => {
        // console.log(details);
      },
    },
  ],
  assets: [
    {
      name: "image",
      url: "../assets/textures/RGBA-Med.jpg",
      assetType: AssetType.Texture,
    },
  ],
  materialParamType: InteractiveScenes.INTERACTIVE_PARTICLES,
  materialFunctions: {
    onInitialize: (material: InteractiveMaterial) => {},
    onTimeUpdate: (material: InteractiveMaterial) => {
      console.log("testing material material");
    },
  },
};
