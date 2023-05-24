import { useMemo } from "react";
import { useInteractionsWithScene } from "./useInteractionsWithScene";
import { InteractiveScene } from "./InteractiveScene";

export const useInteractiveScene = (sceneFunction) => {
  const addInteractions = useInteractionsWithScene();
  return useMemo(() => {
    const scene = new InteractiveScene(sceneFunction);
    addInteractions(scene);
    return scene;
  }, [sceneFunction]);
};
