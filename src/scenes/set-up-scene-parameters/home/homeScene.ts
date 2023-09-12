import { AnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
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
    animations: animationConfig as AnimationConfig[],
    events: [],
  };
};
