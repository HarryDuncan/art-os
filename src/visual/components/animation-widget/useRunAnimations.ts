import { useEffect } from "react";
import { IAnimationWidgetScene } from "./types";
import { useAnimationWidgetRefs } from "./useAnimationWidgetRefs";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { useScenes } from "./scenes/useScenes";
import { useSetActiveScene } from "./scenes/useSetActiveScene";
import { useThreadWithPostProcessor } from "visual/hooks/use-thread";
import { useUpdateScene } from "./scenes/useUpdateScene";

export const useRunAnimations = (sceneParams: IAnimationWidgetScene[]) => {
  const { sceneIndex, isRunningRef } = useAnimationWidgetRefs();
  const {
    container,
    postProcessor,
    renderer,
    currentFrameRef,
    clock,
  } = useThreeJs();
  const { initializedScenes, areScenesInitialized } = useScenes(sceneParams);
  const setActiveScene = useSetActiveScene(
    initializedScenes,
    renderer,
    postProcessor,
    isRunningRef
  );
  const { update } = useThreadWithPostProcessor(
    postProcessor,
    currentFrameRef,
    clock
  );
  useEffect(() => {
    if (areScenesInitialized) {
      setActiveScene(0);
      update();
    }
  }, [areScenesInitialized, setActiveScene, update]);

  useUpdateScene(initializedScenes, areScenesInitialized, sceneIndex);

  return { container };
};
