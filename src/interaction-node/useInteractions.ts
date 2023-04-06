import { useInitializeAlgorithim } from "./interaction-node-requests/useInitializeAlgorithim";

export const useInteractions = (interactionsConfig) => {
  const initializeAlgorithim = useInitializeAlgorithim();
  if (interactionsConfig.length) {
    const request = interactionsConfig[0];
    initializeAlgorithim(request);
  }
  return [];
};
