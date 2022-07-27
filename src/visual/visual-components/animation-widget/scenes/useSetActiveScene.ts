import { useCallback } from 'react';
import PostProcessor from 'visual/components/post-processor/PostProcessor';

export const useSetActiveScene = (
  initializedScenes,
  renderer,
  postProcessor,
  isRunningRef,
) => useCallback(
  (sceneIndex: number) => {
    const currentScene = initializedScenes[sceneIndex];
    postProcessor.current = new PostProcessor({
      renderer,
      scene: currentScene.scene,
      camera: currentScene.camera,
    });
    isRunningRef.current = true;
  },
  [initializedScenes, renderer, isRunningRef, postProcessor],
);
