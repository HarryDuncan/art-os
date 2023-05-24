import { InteractiveScene } from "visual/components/interactive-scene";

export const startSceneElementAnimations = (scene: InteractiveScene) => {
  const sceneElementAnimationIds = scene.animationManager.sceneElementAnimations.flatMap(
    ({ isRunning, animationId }) => (!isRunning ? animationId : [])
  );
  sceneElementAnimationIds.forEach((id) => {
    scene.animationManager.startAnimation(scene, id);
  });
};
