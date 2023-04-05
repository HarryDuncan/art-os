import { InteractiveThreeScene } from "visual/components/interactive";

export const startSceneElementAnimations = (scene: InteractiveThreeScene) => {
  const sceneElementAnimationIds = scene.animationManager.sceneElementAnimations.flatMap(
    ({ isRunning, animationId }) => (!isRunning ? animationId : [])
  );
  sceneElementAnimationIds.forEach((id) => {
    scene.animationManager.startAnimation(scene, id);
  });
};
