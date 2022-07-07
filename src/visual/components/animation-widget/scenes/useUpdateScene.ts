import { useCallback, useEffect } from "react";
import { FunctionBasedScene } from "visual/function-based-scenes/types";
import { useChangeScenes } from "./useChangeScenes";

export const useUpdateScene = (
  initializedScenes: FunctionBasedScene[],
  areScenesInitialized: boolean,
  sceneIndex
) => {
  const currentIndex = sceneIndex.current;
  useChangeScenes(initializedScenes, areScenesInitialized, sceneIndex);

  const updateScene = useCallback(
    (currentIndex: number) => {
      const currentScene: FunctionBasedScene = initializedScenes[currentIndex];
      if (currentScene) {
        currentScene.onUpdate({}, currentScene.sceneParams);
      }
    },
    [initializedScenes]
  );

  useEffect(() => {
    document.addEventListener("scene:update", () => updateScene(currentIndex));
  }, [areScenesInitialized, currentIndex, updateScene]);
};
