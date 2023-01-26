import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import { animateAll } from "visual/helpers/animation/animateAll";
import { chainAnimation } from "visual/helpers/animation/chainAnimation";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import {
  MIRROR_ANIMATION_CONFIG,
  TEXT_ANIMATION_CONFIG,
  CONFIGS,
  CONFIG_INDEX,
} from "./ltw2.constants";

export const ltw2 = () => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 10 } },
    },
    assets: [
      {
        name: "matcap1",
        url: "../assets/textures/matcaps/irredescent.jpg",
        assetType: ASSET_TYPES.Texture,
      },
      {
        name: "matcap-bg",
        url: `../assets/textures/backgrounds/${CONFIGS[CONFIG_INDEX].background}.jpg`,
        assetType: ASSET_TYPES.Texture,
      },
      {
        name: "matcap-ob",
        url: `../assets/textures/matcaps/dark-blue.jpg`,
        assetType: ASSET_TYPES.Texture,
      },
      {
        name: "geometry-model",
        url: "../assets/models/ltw/ltwShapeReduced.obj",
        assetType: ASSET_TYPES.Geometry,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        scene.animationManager.startAnimation("text-rotate", {
          scene,
          targetIdentifier: "title",
          animationConfig: TEXT_ANIMATION_CONFIG,
        });
        scene.animationManager.startAnimation("mirror-rotate", {
          scene,
          targetIdentifier: "mirror",
          animationConfig: MIRROR_ANIMATION_CONFIG,
        });
        scene.animationManager.startAnimation("geometry-rotate", {
          scene,
          targetIdentifier: "geometry",
          animationConfig: MIRROR_ANIMATION_CONFIG,
        });
      },
    },
    interactions: [],
    formatSceneData,
    animations: [
      {
        animationId: "text-rotate",
        animationFunction: chainAnimation,
      },
      {
        animationId: "mirror-rotate",
        animationFunction: animateAll,
      },
      { animationId: "geometry-rotate", animationFunction: animateAll },
    ],
  };
};
