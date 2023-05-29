import { useMemo } from "react";
import { useInteractionsWithScene } from "./useInteractionsWithScene";
import { InteractiveScene } from "./InteractiveScene";

export const useInteractiveScene = (interactionEvents, sceneFunction) => {
  const addInteractions = useInteractionsWithScene(interactionEvents);
  return useMemo(() => {
    const scene = new InteractiveScene(sceneFunction);
    addInteractions(scene);
    return scene;
  }, [sceneFunction]);
};
