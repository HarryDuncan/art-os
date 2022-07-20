import { useCallback, useEffect } from "react";
import { moveThroughArray } from "utils/moveThroughArray";
import { FunctionBasedScene } from "visual/function-based-scenes/types";
import { shouldChangeScene } from "../utils/sceneManager";

export const useChangeScenes = (
  initializedScenes: FunctionBasedScene[],
  areScenesInitialized: boolean,
  sceneIndex
) => {
  const currentIndex = sceneIndex.current;
  const changeSceneIndex = useCallback(() => {
    const { newIndex } = moveThroughArray<FunctionBasedScene>(
      initializedScenes,
      sceneIndex.current
    );
    sceneIndex.current = newIndex;
  }, [sceneIndex, initializedScenes]);

  useEffect(() => {
    if (areScenesInitialized) {
      const { sceneLength } = initializedScenes[
        currentIndex
      ] as FunctionBasedScene;
      if (shouldChangeScene(sceneLength, initializedScenes.length))
        setTimeout(() => {
          changeSceneIndex();
        }, sceneLength);
    }
  }, [areScenesInitialized, initializedScenes, currentIndex, changeSceneIndex]);
};
