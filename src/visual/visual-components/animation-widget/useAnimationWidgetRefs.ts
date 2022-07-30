import { useRef, MutableRefObject } from "react";
import { FunctionBasedScene } from "./types";

export const useAnimationWidgetRefs = () => {
  const sceneArrayRef: MutableRefObject<FunctionBasedScene[]> = useRef([]);
  const sceneIndex: MutableRefObject<number> = useRef(0);
  const isRunningRef: MutableRefObject<boolean> = useRef(false);
  const currentFrameRef: MutableRefObject<number> = useRef(0);

  return {
    sceneIndex,
    isRunningRef,
    currentFrameRef,
    sceneArrayRef,
  };
};
