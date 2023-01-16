import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import { animateAndPause } from "visual/helpers/animation/animateAndPause";
import { chainAnimation } from "visual/helpers/animation/chain-animation/chainAnimation";
import { animateRotation } from "visual/helpers/animation/fastAndSlowRotation";
import { getMeshByName } from "visual/helpers/scene/getMeshByName";
import { getMeshesByIdentifier } from "visual/helpers/scene/getMeshesByIdentifier";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";

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
        name: "matcap2",
        url: "../assets/textures/backgrounds/orange-grad.jpg",
        assetType: ASSET_TYPES.Texture,
      },
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        const text = getMeshesByIdentifier(scene, "title");

        scene.animationManager.startAnimation("text-rotate", text);
      },
    },
    interactions: [],
    formatSceneData,
    animations: [
      {
        animationId: "text-rotate",
        animationFunction: chainAnimation,
      },
    ],
  };
};
