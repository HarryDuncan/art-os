import { useCallback } from "react";
import { InteractiveScene } from "./InteractiveScene";
import { FormattedInteractionConfig } from "interaction/interactions.types";
import { EVENT_BINDING_TYPE } from "interaction/interactions.consts";

export const useInteractionsWithScene = (
  interactionEvents: FormattedInteractionConfig[]
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
