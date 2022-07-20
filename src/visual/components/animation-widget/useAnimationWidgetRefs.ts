import { useRef } from "react";
import { FunctionBasedScene } from "visual/function-based-scenes/types";

export const useAnimationWidgetRefs = () => {
  const sceneIndex: React.MutableRefObject<number> = useRef(0);
  const isRunningRef: React.MutableRefObject<boolean> = useRef(false);
  const currentFrameRef: React.MutableRefObject<number> = useRef(0);
  const sceneArrayRef: React.MutableRefObject<FunctionBasedScene[]> = useRef(
    []
  );

  return {
    sceneIndex,
    isRunningRef,
    currentFrameRef,
    sceneArrayRef,
  };
};
