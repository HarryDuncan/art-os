import React, { useCallback } from "react";
import { Camera, Clock } from "three";
import { InteractiveScene } from "visual/display/components/interactive-scene/InteractiveScene";
import PostProcessor from "visual/display/components/post-processor/PostProcessor";
import { sceneUpdateEvent } from "visual/display/engine/engineEvents";

export const useThreadWithPostProcessor = (
  postProcessor: React.MutableRefObject<PostProcessor | null>,
  currentFrameRef: React.MutableRefObject<number>,
  clock: Clock,
  scene: InteractiveScene | null,
  camera: Camera
) => {
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

  return { update, pause };
};
