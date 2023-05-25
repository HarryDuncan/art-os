import { useAppSelector } from "app/redux/store";
import { useCallback } from "react";
import { InteractiveScene } from "./InteractiveScene";
import { EVENT_BINDING_TYPE } from "interaction-node/interactions.constants";

export const useInteractionsWithScene = () => {
  const { interactionEvents } = useAppSelector(
    (state) => state.interactionNode
  );
  const sceneInteractionEvents = interactionEvents.flatMap((interactionEvent) =>
    (interactionEvent.bindingType !== EVENT_BINDING_TYPE.MATERIAL
      ? interactionEvent
      : [])
  );
  return useCallback(
    (scene: InteractiveScene) => {
      scene.addInteractionEvents(sceneInteractionEvents);
    },
    [interactionEvents]
  );
};
