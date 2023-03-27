import { InteractiveThreeScene } from "visual/components/interactive/scene/InteractiveScene";
import { animateMarchingCube } from "visual/components/three-js-components/components/marching-cubes/marchingCubeAnimation";

import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
const computeConfig = import("./config.json");

export const compute = (sceneConfig) => {
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
    ],

    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        animateMarchingCube(scene);
      },
    },
    interactions: [],

    formatSceneData,
    animations: [],
  };
};
