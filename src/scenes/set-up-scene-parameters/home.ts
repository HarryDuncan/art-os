import { startSceneElementAnimations } from "visual/display/animation/animation-manager/startSceneElementAnimations";
import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const home = (config, sceneData) => {
  const { animationConfig } = config;

  return {
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
      },
    },
    interactionEvents: [],
    sceneData,
    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
