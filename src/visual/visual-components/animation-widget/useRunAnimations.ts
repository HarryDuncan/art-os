import { useEffect } from "react";
import { IAnimationWidgetScene } from "./types";
import { useAnimationWidgetRefs } from "./useAnimationWidgetRefs";
import { useThreeJs } from "visual/hooks/use-three-js/useThreeJs";
import { useScenes } from "./scenes/useScenes";
import { useSetActiveScene } from "./scenes/useSetActiveScene";
import { useThread } from "visual/hooks/use-thread/useThread";
import { useUpdateScene } from "./scenes/useUpdateScene";

export const useRunAnimations = (sceneParams: IAnimationWidgetScene[]) => {
  // Refs
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

  const { update } = useThread(postProcessor, currentFrameRef, clock);

  useEffect(() => {
    if (areScenesInitialized) {
      setActiveScene(0);
      update();
    }
  }, [areScenesInitialized, setActiveScene, update]);

  useUpdateScene(initializedScenes, areScenesInitialized, sceneIndex);

  return { container, currentFrameRef };
};

// const { current: sceneArray } = sceneArrayRef;
// const { current: isRunning } = isRunningRef;
// const { current: currentVisual } = currentVisualRef;
// if (isRunning && !!sceneArray && currentVisual) {
//   // PLAYING THE THREAD
//   const play = () => {
//     currentVisual.onUpdate(framework, currentVisual.sceneParams);
//     framework?.visual?.renderer?.render(
//       currentVisual.scene,
//       currentVisual.camera
//     );

//     currentFrameRef.current = requestAnimationFrame(play);
//   };

//   // PAUSING THE THREAD
//   const pause = () => {
//     cancelAnimationFrame(currentFrameRef.current);
//   };

//   const changeScene = () => {
//     sceneIndex.current =
//       sceneIndex.current >= sceneArray.length - 1
//         ? 0
//         : sceneIndex.current + 1;

//     cancelAnimationFrame(currentFrameRef.current);
//     currentVisualRef.current = sceneArray[sceneIndex.current];

//     updateFramework({
//       ...framework,
//       controlParams: {
//         ...framework.controlParams,
//         reInitScene: true,
//         automaticSwitchingOn: true,
//         breakAnimation: false,
//         changeVisuals: false,
//       },
//     } as IFramework);
//     play();
//   };

//   if (shouldChangeScene(currentVisual.sceneLength, sceneArray.length)) {
//     setTimeout(() => {
//       pause();
//       changeScene();
//     }, currentVisual.sceneLength);
//   }
//   play();
// }
