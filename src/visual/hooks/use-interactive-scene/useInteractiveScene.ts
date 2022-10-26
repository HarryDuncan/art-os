import { useMemo } from "react";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive-scene/InteractiveScene";
import { SceneObject } from "visual/components/interactive-scene/types";
import { InteractionEventObject } from "../use-interactions/types";

export const useInteractiveScene = (
  interactionEvents: InteractionEventObject[],
  sceneFunctions,
  sceneParams = {},
  sceneObjects: SceneObject[] = [],
  isSceneDataInitialized = false
) =>
  useMemo(() => {
    const scene = isSceneDataInitialized
      ? new InteractiveScene(
          interactionEvents,
          sceneFunctions,
          sceneParams,
          sceneObjects
        )
      : null;
    return scene;
  }, [isSceneDataInitialized]);
