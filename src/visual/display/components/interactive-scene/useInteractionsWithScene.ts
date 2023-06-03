import { useCallback } from "react";
import { InteractiveScene } from "./InteractiveScene";
import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";
import { InteractionEventConfig } from "interaction-node/interactions.types";

export const useInteractionsWithScene = (
  interactionEvents: InteractionEventConfig[]
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
