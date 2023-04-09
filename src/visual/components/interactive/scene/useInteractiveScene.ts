import { useMemo } from "react";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive/scene/InteractiveScene";
import { useInteractionsWithScene } from "./useInteractionsWithScene";

export const useInteractiveScene = (sceneFunction) => {
  const addInteractions = useInteractionsWithScene();
  return useMemo(() => {
    const scene = new InteractiveScene(sceneFunction);
    addInteractions(scene);
    return scene;
  }, [sceneFunction]);
};
