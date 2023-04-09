import { useCallback, useEffect } from "react";
import { useInitializeAlgorithm } from "./interaction-node-requests/useInitializeAlgorithm";
import { useAppDispatch } from "app/redux/store";
import { setInteractionEvents } from "app/redux/interaction-node/actions";

export const useInteractions = (interactionsConfig) => {
  const initializeAlgorithm = useInitializeAlgorithm();
  useEffect(() => {
    if (interactionsConfig.length) {
      const request = interactionsConfig[0];
      initializeAlgorithm(request);
    }
  }, []);

  const dispatch = useAppDispatch();
  return useCallback((interactionEvents) => {
    dispatch(setInteractionEvents({ interactionEvents }));
  }, []);
};
