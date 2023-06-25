import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { startSceneElementAnimations } from "visual/display/animation/animation-manager/startSceneElementAnimations";
import { InteractiveScene } from "visual/display/components/interactive-scene";
import { formatSceneData } from "visual/set-up/config/formatSceneData";

export const ltw = (config, assets) => {
  const { animationConfig } = config;
  const { meshes, sceneComponents, lights, sceneProperties } = formatSceneData(
    config,
    assets
  );

  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: 13 } },
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
      sceneComponents,
      lights,
      sceneProperties,
    },

    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
