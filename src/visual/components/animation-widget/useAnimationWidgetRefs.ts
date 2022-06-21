import { useRef } from "react";
import { FunctionBasedScene } from "./types";

export const useAnimationWidgetRefs = () => {
  const sceneArrayRef: React.MutableRefObject<FunctionBasedScene[]> = useRef(
    []
  );
  const sceneIndex: React.MutableRefObject<number> = useRef(0);

  const isRunningRef: React.MutableRefObject<boolean> = useRef(false);

  const currentFrameRef: React.MutableRefObject<number> = useRef(0);

  return {
    sceneIndex,
    isRunningRef,
    currentFrameRef,
    sceneArrayRef,
  };
};
