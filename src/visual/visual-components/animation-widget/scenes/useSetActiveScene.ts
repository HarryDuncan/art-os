import { useCallback } from "react";
import PostProcessing from "visual/components/post-processing/PostProcessing";

export const useSetActiveScene = (
  initializedScenes,
  renderer,
  postProcessor,
  isRunningRef
) => {
  return useCallback(
    (sceneIndex: number) => {
      const currentScene = initializedScenes[sceneIndex];
      postProcessor.current = new PostProcessing({
        renderer,
        scene: currentScene.scene,
        camera: currentScene.camera,
      });
      isRunningRef.current = true;
    },
    [initializedScenes, renderer, isRunningRef, postProcessor]
  );
};
