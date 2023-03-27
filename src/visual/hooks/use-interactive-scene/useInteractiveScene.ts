import { useMemo } from "react";
import { InteractiveThreeScene as InteractiveScene } from "visual/components/interactive/scene/InteractiveScene";
import { SceneObject } from "visual/components/interactive/scene/types";
import { getBoundInteractions } from "visual/helpers/interactions/getBoundInteractions";
import {
  Binding,
  InteractionEventObject,
} from "../../helpers/interactions/types";

export const useInteractiveScene = (
  interactions: InteractionEventObject[],
  sceneFunctions,
  sceneParams = {},
  sceneObjects: SceneObject[] = [],
  isSceneDataInitialized = false
) =>
  useMemo(() => {
    const boundInteractions = getBoundInteractions(
      interactions,
      Binding.InteractiveScene
    );
    const scene = isSceneDataInitialized
      ? new InteractiveScene(
          boundInteractions,
          sceneFunctions,
          sceneParams,
          sceneObjects
        )
      : null;
    return scene;
  }, [isSceneDataInitialized]);
