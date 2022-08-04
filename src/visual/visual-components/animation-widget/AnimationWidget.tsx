import React, { useEffect } from "react";
import { AnimationWidgetScene } from "./types";
import { useRunAnimations } from "./useRunAnimations";
import { RootContainer } from "../../components/root-container";

interface AnimationWidgetProps {
  scenes: AnimationWidgetScene[];
  viewHeight?: string;
  viewWidth?: string;
}

// Scene framework for displaying multiple function based scenes
export function AnimationWidget({
  scenes,
  viewWidth = "100vw",
  viewHeight = "100vh",
}: AnimationWidgetProps) {
  const { container, currentFrameRef } = useRunAnimations(scenes);

  useEffect(() => {
    const currentFrame = currentFrameRef.current;
    return () => cancelAnimationFrame(currentFrame);
  }, [currentFrameRef]);
  return (
    <RootContainer
      containerRef={container}
      viewWidth={viewWidth}
      viewHeight={viewHeight}
    />
  );
}
