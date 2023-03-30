import { InteractiveThreeScene } from "visual/components/interactive/scene/InteractiveScene";
import { animateMarchingCube } from "visual/components/three-js-components/components/marching-cubes/marchingCubeAnimation";
import { animateAll } from "visual/helpers/animation/animateAll";

import { ASSET_TAG, ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import computeConfig from "./config.json";

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
    assets: [
      {
        name: "nymph-geometry",
        url: "../assets/models/nymph1.obj",
        assetType: ASSET_TYPES.Geometry,
      },
      ...infoText,
      ...materials,
    ],

    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        scene.animationManager.startAnimation("binary-rotate", {
          scene,
          targetIdentifier: "binary",
          animationConfig: computeConfig[0].animationConfig[0],
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
    ],
  };
};
