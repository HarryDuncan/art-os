import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { Camera, WebGLRenderer } from "three";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import PostProcessor from "visual/display/components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "visual/display/engine/engineEvents";

export const useThreadWithPostProcessor = (
  currentFrameRef: MutableRefObject<number>,
  scene: InteractiveScene | null,
  camera: Camera,
  renderer: WebGLRenderer,
  passes
) => {
  const postProcessor: MutableRefObject<null | PostProcessor> = useRef(null);

  const update = useCallback(() => {
    sceneUpdateEvent();
    if (scene) {
      if (scene?.orbitControls) {
        scene.orbitControls.update();
      }
      if (scene?.animationManager.hasCameraAnimations()) {
        scene.animationManager.startCameraAnimation(camera);
      }
    }

    postProcessor.current?.render(performance.now());
    currentFrameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(currentFrameRef.current);
    };
  }, [currentFrameRef, postProcessor, camera, scene]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  useEffect(() => {
    if (scene && camera && renderer && !postProcessor.current) {
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes,
      });
    }
  }, [scene, camera, renderer, postProcessor, passes]);

  const initializeSceneWithData = useCallback(() => {
    if (postProcessor.current) {
      update();
    }
  }, [update, postProcessor]);

  useEffect(() => {
    initializeSceneWithData();
    return () => {
      pause();
    };
  }, [initializeSceneWithData, pause]);
};
