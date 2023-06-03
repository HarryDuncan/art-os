import { updateUniformTime } from "visual/display/animation/animation-functions/uniforms/updateUniform";
import { startSceneElementAnimations } from "visual/display/animation/animation-manager/startSceneElementAnimations";
import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene";
import { formatSceneData } from "visual/set-up/config/formatSceneData";
import { getThreeJsFromConfig } from "visual/set-up/config/three-js/formatThreeParams";

export const barbaFans = (config, assets) => {
  const { animationConfig } = config;
  const threeJsParams = getThreeJsFromConfig(config.threeJsConfig ?? {});
  const sceneData = formatSceneData(config, assets);
  return {
    threeJsParams,
    animations: animationConfig as CustomAnimationConfig[],
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        startSceneElementAnimations(scene);
        updateUniformTime(scene, "lipstick");
      },
    },
    sceneData,
  };
};
