import { setAlgorithm } from "app/redux/interaction-node/actions";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { INTERACTION_NODE_CLIENT } from "interaction-node/interactions.constants";
import { InitializeAlgorithmRequest } from "interaction-node/protos/interactionNode_pb";
import { useCallback } from "react";
import { getResponseValue } from "utils/grpc/getResponseValue";
import { mapResponseToObject } from "utils/grpc/mapResponseToObject";

const initializeAlgorithmResponse = {
  id: null,
  isAlgorithmInitialized: false,
};
export const useInitializeAlgorithm = () => {
  const { isInitialized } = useAppSelector((state) => state.interactionNode);
  const dispatch = useAppDispatch();
  return useCallback(
    ({ algorithmType, dataTransformType }) => {
      if (!isInitialized) {
        console.warn("interaction node not initialized");
        return;
      }
      const request = new InitializeAlgorithmRequest();
      request.setAlgorithmType(algorithmType);
      request.setDataTransformType(dataTransformType);
      const client = INTERACTION_NODE_CLIENT;
      client.initalizeAlgorithm(request, null, (err, response) => {
        if (err) {
          console.error(err);
        }
        const values = getResponseValue(response);
        // @ts-ignore
        const { isAlgorithmInitialized } = mapResponseToObject(
          values,
          initializeAlgorithmResponse
        );
        dispatch(setAlgorithm({ isAlgorithmInitialized, algorithmType }));
      });
    },
    [isInitialized]
  );
};
