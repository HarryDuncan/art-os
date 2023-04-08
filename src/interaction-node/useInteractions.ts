import { useEffect } from "react";
import { useInitializeAlgorithm } from "./interaction-node-requests/useInitializeAlgorithm";

export const useInteractions = (interactionsConfig) => {
  const initializeAlgorithm = useInitializeAlgorithm();
  useEffect(() => {
    if (interactionsConfig.length) {
      const request = interactionsConfig[0];
      initializeAlgorithm(request);
    }
  }, []);
};
