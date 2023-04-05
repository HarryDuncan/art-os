import React, { useCallback } from "react";
import { Camera, Clock, Scene } from "three";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { ev } from "../use-events/useEventsWithMeshes";
import { InteractiveThreeScene } from "visual/components/interactive";

export const useThreadWithPostProcessor = (
  postProcessor: React.MutableRefObject<PostProcessor | null>,
  currentFrameRef: React.MutableRefObject<number>,
  clock: Clock,
  scene: InteractiveThreeScene | null,
  camera: Camera
) => {
  const update = useCallback(() => {
    ev("scene:update");
    if (scene?.orbitControls) {
      scene.orbitControls.update();
    }
    if (scene?.animationManager.hasCameraAnimations()) {
      scene.animationManager.startCameraAnimation(camera);
    }
    postProcessor.current?.render(clock.getDelta());
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, postProcessor, clock]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  return { update, pause };
};
