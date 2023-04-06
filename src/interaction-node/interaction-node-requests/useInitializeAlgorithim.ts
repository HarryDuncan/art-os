import { useAppSelector } from "app/redux/store";
import { INTERACTION_NODE_CLIENT } from "interaction-node/interactions.constants";
import { InitializeAlgorithmRequest } from "interaction-node/protos/interactionNode_pb";
import { useCallback } from "react";

export const useInitializeAlgorithim = () => {
  const { isInitialized } = useAppSelector((state) => state.interactionNode);
  return useCallback(
    ({ algorithimType, dataTransformType }) => {
      if (!isInitialized) {
        console.warn("interaction node not initialized");
        return;
      }
      const request = new InitializeAlgorithmRequest();
      request.setAlgorithmType(algorithimType);
      request.setDataTransformType(dataTransformType);
      const client = INTERACTION_NODE_CLIENT;
      client.initalizeAlgorithim(request, null, (err, response) => {
        if (err) {
          console.error(err);
        }
        console.log(response);
      });
    },
    [isInitialized]
  );
};
