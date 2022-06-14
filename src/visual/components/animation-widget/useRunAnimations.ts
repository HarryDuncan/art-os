import React, { useEffect, useRef } from "react";
import { INITIAL_FRAMEWORK } from "./framework/consts";
import { IFramework } from "./framework/types";
import { IAnimationWidgetScene, TWidgetVisual } from "./types";
import { useInitializeScenes } from "./scenes";
import { shouldChangeScene } from "./utils/sceneManager";

export const useRunAnimations = (
  container: React.MutableRefObject<null | any>,
  sceneParams: IAnimationWidgetScene[],
  updateFramework: React.Dispatch<React.SetStateAction<IFramework | undefined>>,
  framework: Partial<IFramework> = INITIAL_FRAMEWORK
) => {
  // Refs
  const {
    sceneIndex,
    isRunningRef,
    currentFrameRef,
    currentVisualRef,
    sceneArrayRef,
  } = useAnimationWidgetRefs();

  const initializeVisual = () => {
    if (!!container && framework.isInitialized) {
      let node: any = container.current;
      if (!!node && framework?.visual?.renderer) {
        node.appendChild(framework?.visual?.renderer.domElement);
      }

      if (framework?.widgetState && framework?.visual) {
        currentVisualRef.current = sceneArrayRef.current[sceneIndex.current];

        framework?.visual?.renderer?.render(
          currentVisualRef.current.scene,
          currentVisualRef.current.camera
        );

        updateFramework({
          ...framework,
          visual: {
            ...framework.visual,
            scene: currentVisualRef.current.scene,
            camera: currentVisualRef.current.camera,
          },
        } as IFramework);

        framework.widgetState.setCurrentVisual(currentVisualRef.current);
        isRunningRef.current = true;
      }
    }
  };

  useInitializeScenes(sceneParams, framework, isRunningRef.current)
    .then((response: TWidgetVisual[]) => {
      sceneArrayRef.current = response;
      initializeVisual();
    })
    .catch(() => {
      // todo - loading state?
    });

  useEffect(() => {
    const { current: sceneArray } = sceneArrayRef;
    const { current: isRunning } = isRunningRef;
    const { current: currentVisual } = currentVisualRef;
    if (isRunning && !!sceneArray && currentVisual) {
      // PLAYING THE THREAD
      const play = () => {
        currentVisual.onUpdate(framework, currentVisual.sceneParams);
        framework?.visual?.renderer?.render(
          currentVisual.scene,
          currentVisual.camera
        );

        currentFrameRef.current = requestAnimationFrame(play);
      };

      // PAUSING THE THREAD
      const pause = () => {
        cancelAnimationFrame(currentFrameRef.current);
      };

      const changeScene = () => {
        sceneIndex.current =
          sceneIndex.current >= sceneArray.length - 1
            ? 0
            : sceneIndex.current + 1;

        cancelAnimationFrame(currentFrameRef.current);
        currentVisualRef.current = sceneArray[sceneIndex.current];

        updateFramework({
          ...framework,
          controlParams: {
            ...framework.controlParams,
            reInitScene: true,
            automaticSwitchingOn: true,
            breakAnimation: false,
            changeVisuals: false,
          },
        } as IFramework);
        play();
      };

      if (shouldChangeScene(currentVisual.sceneLength, sceneArray.length)) {
        setTimeout(() => {
          pause();
          changeScene();
        }, currentVisual.sceneLength);
      }
      play();
    }
  }, [isRunningRef.current, sceneArrayRef.current, currentVisualRef.current]);
};

function useAnimationWidgetRefs() {
  const sceneArrayRef: React.MutableRefObject<TWidgetVisual[]> = useRef([]);
  const isRunningRef: React.MutableRefObject<boolean> = useRef(false);
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const currentVisualRef: React.MutableRefObject<TWidgetVisual> = useRef();
  const sceneIndex: React.MutableRefObject<number> = useRef(0);

  return {
    sceneIndex,
    isRunningRef,
    currentFrameRef,
    currentVisualRef,
    sceneArrayRef,
  };
}
