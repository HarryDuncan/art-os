import { positionUpdateInteraction } from "interaction/external/interaction-events/positionUpdate";
import { startSceneElementAnimations } from "visual/display/animation/animation-manager/startSceneElementAnimations";
import { AnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const defaultScene = (config, sceneData) => {
  const { animationConfig } = config;
  return {
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
      },
    },
    interactionEvents: [positionUpdateInteraction],
    sceneData,
    animations: (animationConfig as AnimationConfig[]) ?? [],
    events: [],
  };
};
