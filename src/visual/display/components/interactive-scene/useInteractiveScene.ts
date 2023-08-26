import { useMemo } from "react";
import { useInteractionsWithScene } from "./useInteractionsWithScene";
import {
  InteractiveScene,
  InteractiveSceneFunctions,
  SceneInteraction,
} from "./InteractiveScene";
import { EventConfig } from "interaction/interactions.types";

export const useInteractiveScene = (
  interactionEvents: SceneInteraction[],
  sceneFunction: InteractiveSceneFunctions,
  eventConfig: EventConfig[] = []
) => {
  const addInteractions = useInteractionsWithScene(interactionEvents);
  return useMemo(() => {
    const scene = new InteractiveScene(sceneFunction, eventConfig);
    addInteractions(scene);
    return scene;
  }, [sceneFunction, eventConfig, addInteractions]);
};
