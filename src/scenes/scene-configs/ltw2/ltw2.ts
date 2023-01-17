import { InteractiveThreeScene } from "visual/components/interactive-scene/InteractiveScene";
import { chainAnimation } from "visual/helpers/animation/chainAnimation";
import { getMeshesByIdentifier } from "visual/helpers/scene/getMeshesByIdentifier";
import { ASSET_TYPES } from "visual/hooks/use-assets/types";
import { formatSceneData } from "./formatSceneData";
import { TEXT_ANIMATION_CONFIG } from "./ltw2.constants";

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
    ],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        scene.animationManager.startAnimation("text-rotate", {
          scene,
          targetIdentifier: "title",
          animationConfig: TEXT_ANIMATION_CONFIG,
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
    ],
  };
};
