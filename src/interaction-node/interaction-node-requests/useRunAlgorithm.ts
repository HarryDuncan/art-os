import { useAppDispatch, useAppSelector } from "app/redux/store";
import { INTERACTION_NODE_CLIENT } from "interaction-node/interactions.constants";
import { RunAlgorithmRequest } from "interaction-node/protos/interactionNode_pb";
import { useCallback } from "react";
import { getResponseValue } from "utils/grpc/getResponseValue";

export const useRunAlgorithm = () => {
  const { isInitialized, isAlgorithmInitialized } = useAppSelector(
    (state) => state.interactionNode
  );
  const dispatch = useAppDispatch();
  return useCallback(() => {
    if (!isInitialized) {
      console.warn("interaction node not initialized");
      return;
    } else if (!isAlgorithmInitialized) {
      console.warn(`algorithm not initialized`);
    }
    const request = new RunAlgorithmRequest();
    const client = INTERACTION_NODE_CLIENT;
    client.runAlgorithm(request, null, (err, response) => {
      if (err) {
        console.error(err);
      }
      const values = getResponseValue(response);
      // @ts-ignore
      console.log(values);
    });
  }, [isInitialized]);
};
