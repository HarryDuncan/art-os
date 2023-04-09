import { CustomAnimationConfig } from "visual/animation/animation.types";

import { formatSceneData } from "./formatSceneData";
import { startSceneElementAnimations } from "visual/animation/animation-manager/startSceneElementAnimations";
import { formatInteractionEvents } from "./formatInteractionEvents";
import { InteractiveScene } from "visual/components/interactive-scene";

export const compute = (config, assets) => {
  const sceneData = formatSceneData(config, assets);
  const { animationConfig, interactionConfig } = config;
  const interactionEvents = formatInteractionEvents(interactionConfig);

  return {
    threeJsParams: {
      camera: { position: { x: 0, y: 0, z: -5 } },
      controls: {
        hasOrbitControls: true,
      },
    },
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
      },
    },
    interactionEvents,
    sceneData,
    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
