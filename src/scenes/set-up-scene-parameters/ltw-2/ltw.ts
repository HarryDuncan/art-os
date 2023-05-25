import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { startSceneElementAnimations } from "visual/display/animation/animation-manager/startSceneElementAnimations";
import { InteractiveScene } from "visual/display/components/interactive-scene";
import { formatSceneData } from "../formatSceneData";

export const ltw = (config, assets) => {
  const { animationConfig } = config;
  const { meshes, sceneComponents, lights } = formatSceneData(config, assets);

  return {
    threeJsParams: {
      camera: { position: { x: 0, y: -1, z: 15 } },
      controls: {
        hasOrbitControls: true,
      },
    },
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
      },
    },
    sceneData: {
      meshes,
      sceneComponents: sceneComponents,
      lights,
    },

    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
