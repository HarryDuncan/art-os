import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene";
import { animateMarchingCube } from "visual/display/scene-elements/components/marching-cubes/marchingCubeAnimation";
import { formatSceneData } from "visual/set-up/config/formatSceneData";

export const homeScene = (config, assets) => {
  const { animationConfig } = config;
  const sceneData = formatSceneData(config, assets);
  return {
    threeJsParams: {
      camera: { position: { x: 0, y: -1, z: 5 } },
      controls: {
        hasOrbitControls: true,
      },
    },
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
