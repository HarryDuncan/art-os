import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";

export const ltw2 = () => {
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 10 } },
    },
    assets: [
      {
        name: "font",
        url: "../assets/fonts/defaultFont.json",
        assetType: ASSET_TYPES.FONT,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        console.log(scene);
      },
    },
    interactions: [],
    formatSceneData,
    animations: [],
  };
};
