import { useAppSelector } from "app/redux/store";
import { useCallback } from "react";
import { InteractiveScene } from "./InteractiveScene";

export const useInteractionsWithScene = () => {
  const { interactionEvents } = useAppSelector(
    (state) => state.interactionNode
  );
  return useCallback(
    (scene: InteractiveScene) => {
      scene.addInteractionEvents(interactionEvents);
    },
    [interactionEvents]
  );
};
