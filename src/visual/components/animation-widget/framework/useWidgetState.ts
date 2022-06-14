import { useCallback, useRef, useState } from "react";
import { TScene } from "../scenes/types";

export const useWidgetState = () => {
  const [sceneIndex, updateSceneIndex] = useState<number>(0);
  const sceneArray: TScene[] = [];
  const [currentVisual, setCurrentVisual] = useState<any>(null);
  const [isRunning, toggleIsRunning] = useState<boolean>(false);
  const currentFrame = useRef<number>(0);

  return useCallback(() => {
    return {
      sceneIndex,
      updateSceneIndex,
      sceneArray,
      currentVisual,
      setCurrentVisual,
      isRunning,
      toggleIsRunning,
      currentFrame,
    };
  }, []);
};
