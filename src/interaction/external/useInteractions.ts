import { useCallback, useEffect } from "react";
import { useAppDispatch } from "app/redux/store";
import { setInteractionEvents } from "app/redux/interaction/actions";
import { useInitializeAlgorithm } from "./interaction-node-requests/useInitializeAlgorithm";
import { InteractionConfig } from "interaction/interactions.types";

export const useInteractions = (interactionsConfig: InteractionConfig[]) => {
  const initializeAlgorithm = useInitializeAlgorithm();
  useEffect(() => {
    if (interactionsConfig?.length) {
      const request = interactionsConfig[0];
      // initializeAlgorithm(request);
    }
  }, []);

  const dispatch = useAppDispatch();
  return useCallback((interactionEvents: InteractionConfig[]) => {
    dispatch(setInteractionEvents({ interactionEvents }));
  }, []);
};
