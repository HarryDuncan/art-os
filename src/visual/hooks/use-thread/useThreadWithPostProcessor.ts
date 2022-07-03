import React, { useCallback } from "react";
import { Clock } from "three";
import PostProcessing from "visual/components/post-processing/PostProcessing";
import { ev } from "../use-events/useEvents";

export const useThreadWithPostProcessor = (
  postProcessor: React.MutableRefObject<PostProcessing | null>,
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
