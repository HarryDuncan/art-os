import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene";
import { animateMarchingCube } from "visual/display/scene-elements/components/marching-cubes/marchingCubeAnimation";

export const homeScene = (config, sceneData) => {
  const { animationConfig } = config;

  return {
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        animateMarchingCube(scene);
      },
    },
    interactionEvents: [],
    sceneData,
    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
