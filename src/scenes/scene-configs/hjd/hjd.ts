import { InteractiveThreeScene } from "visual/components/interactive/scene/InteractiveScene";
import { animateAll } from "visual/helpers/animation/animateAll";
import { DEFAULT_ROTATION_CONFIG } from "visual/helpers/animation/animation.constants";
import { chainAnimation } from "visual/helpers/animation/chainAnimation";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import {
  ANIMATION_CONFIG,
  CONFIGS,
  CONFIG_INDEX,
  SPIN_ANIMATION_CONFIG,
} from "./hjd.constants";

export const hjd = () => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 10 } },
    },
    assets: [
      {
        name: "compute-geometry",
        url: "../assets/models/hjd/Compute.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "date-geometry",
        url: "../assets/models/hjd/April27.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "year-geometry",
        url: "../assets/models/hjd/2023.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "gallery-geometry",
        url: "../assets/models/hjd/Gallery.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "hjd-geometry",
        url: "../assets/models/hjd/Hjd.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "name-geometry",
        url: "../assets/models/hjd/solo-exhibition.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "opening-geometry",
        url: "../assets/models/hjd/opening.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "dates-geometry",
        url: "../assets/models/hjd/exhibition-dates.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      {
        name: "time-geometry",
        url: "../assets/models/hjd/time.obj",
        assetType: ASSET_TYPES.Geometry,
      },

      {
        name: "matcap1",
        url: `../assets/textures/matcaps/compute-text.jpg`,
        assetType: ASSET_TYPES.Texture,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        // scene.animationManager.startAnimation("main-animation", {
        //   scene,
        //   targetIdentifier: CONFIGS[CONFIG_INDEX].geometryIdentifier,
        //   animationConfig: ANIMATION_CONFIG,
        // });
        scene.animationManager.startAnimation("main-rotate", {
          scene,
          targetIdentifier: CONFIGS[CONFIG_INDEX].geometryIdentifier,
          animationConfig: SPIN_ANIMATION_CONFIG,
        });
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
        animationFunction: animateAll,
      },
    ],
  };
};
