import { useCallback, useEffect } from "react";
import { useInitializeAlgorithm } from "./interaction-node-requests/useInitializeAlgorithm";
import { useAppDispatch } from "app/redux/store";
import { setInteractionEvents } from "app/redux/interaction-node/actions";
import {
  InteractionConfig,
  InteractionEventConfig,
} from "./interactions.types";

export const useInteractions = (interactionsConfig: InteractionConfig[]) => {
  const initializeAlgorithm = useInitializeAlgorithm();
  useEffect(() => {
    if (interactionsConfig.length) {
      const request = interactionsConfig[0];
      initializeAlgorithm(request);
    }
  }, []);

  const dispatch = useAppDispatch();
  return useCallback((interactionEvents: InteractionEventConfig[]) => {
    dispatch(setInteractionEvents({ interactionEvents }));
  }, []);
};
