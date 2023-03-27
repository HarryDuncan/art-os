import React, { useCallback } from "react";
import { Clock } from "three";
import PostProcessor from "visual/components/post-processor/PostProcessor";
import { ev } from "../use-events/useEventsWithMeshes";

export const useThreadWithPostProcessor = (
  postProcessor: React.MutableRefObject<PostProcessor | null>,
  currentFrameRef: React.MutableRefObject<number>,
  clock: Clock
) => {
  const update = useCallback(() => {
    ev("scene:update");
    postProcessor.current?.render(clock.getDelta());
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, postProcessor, clock]);

  const pause = useCallback(() => {
    cancelAnimationFrame(currentFrameRef.current);
  }, [currentFrameRef]);

  return { update, pause };
};
