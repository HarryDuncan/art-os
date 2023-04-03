import { InteractiveThreeScene } from "visual/components/interactive/scene/InteractiveScene";
import { animateMarchingCube } from "visual/components/three-js-components/components/marching-cubes/marchingCubeAnimation";
import { animateAll } from "visual/helpers/animation/animation-functions/animateAll";

import { ASSET_TAG, ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import computeConfig from "./config.json";
import {
  AnimationConfig,
  AnimationType,
} from "visual/helpers/animation/animation.types";

const infoText = [
  {
    name: "compute-geometry",
    url: "../assets/models/hjd/Compute.obj",
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
    name: "zero-geometry",
    url: "../assets/models/hjd/zero.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "one-geometry",
    url: "../assets/models/hjd/one.obj",
    assetType: ASSET_TYPES.Geometry,
  },
];
const models = [
  {
    name: "nymph-geometry",
    url: "../assets/models/nymph1.obj",
    assetType: ASSET_TYPES.Geometry,
  },
];

const lines = [
  {
    name: "hjdcurves1-geometry",
    url: "../assets/models/hjd-lines/line-1.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "hjdcurves2-geometry",
    url: "../assets/models/hjd-lines/line-2.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "hjdcurves3-geometry",
    url: "../assets/models/hjd-lines/line-3.obj",
    assetType: ASSET_TYPES.Geometry,
  },
  {
    name: "hjdcurves4-geometry",
    url: "../assets/models/hjd-lines/line-4.obj",
    assetType: ASSET_TYPES.Geometry,
  },
];
const materials = [
  {
    name: "matcap-text",
    id: "compute-text",
    url: `../assets/textures/matcaps/compute-text.jpg`,
    assetType: ASSET_TYPES.Texture,
    assetTag: [ASSET_TAG.MATERIAL.MATCAP],
  },
];

export const computeLanding = (sceneConfig) => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 5 } },
      controls: {
        hasOrbitControls: true,
      },
    },
    assets: [...models, ...lines, ...infoText, ...materials],

    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        scene.animationManager.startAnimation("binary-rotate", {
          scene,
          targetIdentifier: "binary",
          animationConfig: computeConfig[0]
            .animationConfig[0] as AnimationConfig,
        });
      },
    },
    interactions: [],

    formatSceneData,
    animations: [
      {
        animationId: "binary-rotate",
        animationFunction: animateAll,
      },
      {
        animationId: "move-lights",
        animationFunction: animateAll,
      },
    ],
  };
};
