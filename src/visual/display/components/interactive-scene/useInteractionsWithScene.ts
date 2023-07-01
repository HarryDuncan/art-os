import { useCallback } from "react";
import { InteractiveScene, SceneInteraction } from "./InteractiveScene";
import { EVENT_BINDING_TYPE } from "interaction/interactions.consts";
import { ShaderInteraction } from "visual/display/materials/interactive/InteractiveShaderMaterial";

export const useInteractionsWithScene = (
  interactionEvents: ShaderInteraction[] | SceneInteraction[]
) => {
  const sceneInteractionEvents = interactionEvents.flatMap(
    (interactionEvent) => {
      return interactionEvent.bindingType !== EVENT_BINDING_TYPE.MATERIAL
        ? interactionEvent
        : [];
    }
  );
  return useCallback(
    (scene: InteractiveScene) => {
      scene.addInteractionEvents(sceneInteractionEvents);
    },
    [interactionEvents]
  );
};
