import React, { useEffect } from "react";
import { AnimationWidgetScene } from "./types";
import { useRunAnimations } from "./useRunAnimations";
import { RootContainer } from "../../components/root-container";

interface AnimationWidgetProps {
  scenes: AnimationWidgetScene[];
}

// Scene framework for displaying multiple function based scenes
export function AnimationWidget({ scenes }: AnimationWidgetProps) {
  const { container, currentFrameRef } = useRunAnimations(scenes);

  useEffect(() => {
    const currentFrame = currentFrameRef.current;
    return () => cancelAnimationFrame(currentFrame);
  }, [currentFrameRef]);
  return <RootContainer containerRef={container} />;
}
