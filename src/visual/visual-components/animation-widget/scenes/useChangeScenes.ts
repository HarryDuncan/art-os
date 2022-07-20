import { MutableRefObject, useCallback, useEffect } from "react";
import { moveThroughArray } from "utils/moveThroughArray";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { FunctionBasedScene } from "../types";

export const useChangeScenes = (
  initializedScenes: FunctionBasedScene[],
  areScenesInitialized: boolean,
  sceneIndex: MutableRefObject<number>,
  postProccessor: MutableRefObject<PostProcessing | null>
) => {
  const currentIndex = sceneIndex.current;

  const changeScene = useCallback(
    (updatedIndex?: number) => {
      const { newIndex } = moveThroughArray<FunctionBasedScene>(
        initializedScenes,
        updatedIndex ?? currentIndex
      );
      sceneIndex.current = newIndex;
      const currentScene = initializedScenes[newIndex];
      if (currentScene.camera && currentScene.scene) {
        postProccessor.current?.updateProcessorParams(
          currentScene.camera,
          currentScene.scene
        );
        setTimeout(() => {
          changeScene(newIndex);
        }, currentScene.sceneLength);
      }
    },
    [sceneIndex, currentIndex, postProccessor, initializedScenes]
  );

  useEffect(() => {
    if (areScenesInitialized && sceneIndex) {
      const currentIndex = sceneIndex.current;
      const { sceneLength } = initializedScenes[
        currentIndex
      ] as FunctionBasedScene;
      if (shouldChangeScene(sceneLength, initializedScenes.length))
        setTimeout(() => {
          changeScene();
        }, sceneLength);
    }
  }, [areScenesInitialized, initializedScenes, changeScene, sceneIndex]);
};

const shouldChangeScene = (
  currentSceneLength: number,
  sceneArrayLength: number
) => currentSceneLength !== -1 && sceneArrayLength > 1;
