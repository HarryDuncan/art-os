import { InteractiveThreeScene } from "visual/components/interactive/scene/InteractiveScene";
import { DEFAULT_ROTATION_CONFIG } from "visual/helpers/animation/animation.constants";
import { chainAnimation } from "visual/helpers/animation/chainAnimation";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { events } from "./events";
import { formatSceneData } from "./formatSceneData";
import { ANIMATION_CONFIG, SPIN_ANIMATION_CONFIG } from "./hjd.constants";

export const hjd2 = () => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 10 } },
    },
    assets: [
      {
        name: "nymph-geometry",
        url: "../assets/models/nymph1.obj",
        assetType: ASSET_TYPES.Geometry,
      },

      {
        name: "matcap1",
        url: `../assets/textures/matcaps/mirror-pearl.jpg`,
        assetType: ASSET_TYPES.Texture,
      },
      {
        name: "matcap2",
        url: `../assets/textures/HJDBg.jpg`,
        assetType: ASSET_TYPES.Texture,
      },
      {
        name: "bg-video",
        url: "../assets/video/BackgroundVid.mp4",
        assetType: ASSET_TYPES.Video,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        scene.animationManager.startAnimation("main-animation", {
          scene,
          targetIdentifier: "nymph",
          animationConfig: ANIMATION_CONFIG,
        });
        scene.animationManager.startAnimation("main-rotate", {
          scene,
          targetIdentifier: "nymph",
          animationConfig: SPIN_ANIMATION_CONFIG,
        });
        // scene.animationManager.startAnimation("sphere-rotate", {
        //   scene,
        //   targetIdentifier: "bg",
        //   animationConfig: DEFAULT_ROTATION_CONFIG,
        // });
      },
    },
    interactions: [],
    formatSceneData,
    animations: [
      {
        animationId: "main-animation",
        animationFunction: chainAnimation,
      },
      {
        animationId: "main-rotate",
        animationFunction: chainAnimation,
      },
      {
        animationId: "sphere-rotate",
        animationFunction: chainAnimation,
      },
    ],
    events,
  };
};
