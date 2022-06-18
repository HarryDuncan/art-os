import { useCallback } from "react";
import { ev } from "../use-events/useEvents";

export const useThread = (postProcessor, currentFrameRef, clock) => {
  const update = useCallback(() => {
    ev("scene:update");
    postProcessor.current?.render(clock.getDelta());
    currentFrameRef.current = requestAnimationFrame(update);
  }, [currentFrameRef, postProcessor, clock]);

  return { update };
  // const pause = () => {
  //   cancelAnimationFrame(currentFrameRef.current);
  // };
};
