import { useAppSelector } from "app/redux/store";
import { useCallback } from "react";
import { InteractiveThreeScene } from "./InteractiveScene";

export const useInteractionsWithScene = () => {
  const { interactionEvents } = useAppSelector(
    (state) => state.interactionNode
  );
  return useCallback(
    (scene: InteractiveThreeScene) => {
      scene.addInteractionEvents(interactionEvents);
    },
    [interactionEvents]
  );
};
