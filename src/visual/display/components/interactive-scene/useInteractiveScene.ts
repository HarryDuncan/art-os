import { useMemo } from "react";
import { useInteractionsWithScene } from "./useInteractionsWithScene";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
  SceneInteraction,
} from "./InteractiveScene";

export const useInteractiveScene = (
  interactionEvents: SceneInteraction[],
  sceneFunction: InteractiveSceneFunctions
) => {
  const addInteractions = useInteractionsWithScene(interactionEvents);
  return useMemo(() => {
    const scene = new InteractiveScene(sceneFunction);
    addInteractions(scene);
    return scene;
  }, [sceneFunction, addInteractions]);
};
