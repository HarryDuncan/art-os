import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { Camera, Clock, WebGLRenderer } from "three";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import PostProcessor from "visual/display/components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "visual/display/engine/engineEvents";

export const useThreadWithPostProcessor = (
  currentFrameRef: MutableRefObject<number>,
  clock: Clock,
  scene: InteractiveScene | null,
  camera: Camera,
  renderer: WebGLRenderer
) => {
  const postProcessor: MutableRefObject<null | PostProcessor> = useRef(null);

  const update = useCallback(() => {
    sceneUpdateEvent();
    if (scene?.orbitControls) {
      scene.orbitControls.update();
    }
    if (scene?.animationManager.hasCameraAnimations()) {
      scene.animationManager.startCameraAnimation(camera);
    }
    postProcessor.current?.render(clock.getDelta());
    currentFrameRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(currentFrameRef.current);
    };
  }, [
    currentFrameRef,
    postProcessor,
    clock,
    camera,
    scene?.animationManager,
    scene?.orbitControls,
  ]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);
  useEffect(() => {
    if (scene && camera && renderer && !postProcessor.current) {
      postProcessor.current = new PostProcessor({
        renderer,
        scene,
        camera,
        passes: [],
      });
    }
  }, [scene, camera, renderer, postProcessor]);
  return { update, pause, postProcessor };
};
