import { useCallback, useRef, useState } from "react";
import { TScene } from "../scenes/types";

export const useWidgetState = () => {
  const [sceneIndex, updateSceneIndex] = useState<number>(0);
  const sceneArray: TScene[] = [];
  const currentFrame = useRef<number>(0);

  return useCallback(() => {
    return {
      sceneIndex,
      updateSceneIndex,
      sceneArray,

      currentFrame,
    };
  }, []);
};
