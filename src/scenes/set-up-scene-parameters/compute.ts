import { CustomAnimationConfig } from "visual/animation/animation.types";
import { InteractiveThreeScene } from "visual/components/interactive";
import { formatSceneData } from "./formatSceneData";
import { startSceneElementAnimations } from "visual/animation/animation-manager/startSceneElementAnimations";

export const compute = (config, assets) => {
  const sceneData = formatSceneData(config, assets);
  const { animationConfig } = config;
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 5 } },
      controls: {
        hasOrbitControls: true,
      },
    },
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveThreeScene) => {
        startSceneElementAnimations(scene);
      },
    },
    interactions: [],
    sceneData,
    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
