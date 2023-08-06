import { CustomAnimationConfig } from "visual/display/animation/animation.types";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";

export const defaultScene = (config, sceneData) => {
  const { animationConfig } = config;

  return {
    sceneFunctions: {
      onTimeUpdate: (scene: InteractiveScene) => {
        const time = scene.clock.getElapsedTime();
        // @ts-ignore
        scene.children[0].material.uniforms.uTime.value = time;
      },
    },
    interactionEvents: [],
    sceneData,
    animations: animationConfig as CustomAnimationConfig[],
    events: [],
  };
};
