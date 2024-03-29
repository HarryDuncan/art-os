import { setAlgorithm } from "app/redux/interaction/actions";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import {
  AlgorithimConfig,
  InitializeAlgorithmRequest,
} from "interaction/external/protos/interactionNode_pb";
import { useCallback } from "react";
import { getResponseValue } from "utils/grpc/getResponseValue";
import { mapResponseToObject } from "utils/grpc/mapResponseToObject";
import { INTERACTION_NODE_CLIENT } from "../interactions.constants";

const initializeAlgorithmResponse = {
  id: null,
  isAlgorithmInitialized: false,
};
export const useInitializeAlgorithm = () => {
  const { isInitialized } = useAppSelector((state) => state.interactionNode);
  const dispatch = useAppDispatch();
  return useCallback(
    ({ algorithmType, dataTransformType, algorithmConfig, id }) => {
      if (!isInitialized) {
        console.warn("interaction node not initialized");
        return;
      }
      const config = new AlgorithimConfig();
      config.setKeyPointsList(algorithmConfig.keypoints);
      config.setThreshold(algorithmConfig.threshold);
      const request = new InitializeAlgorithmRequest();
      request.setAlgorithmType(algorithmType);
      request.setDataTransformType(dataTransformType);
      request.setAlgorithmConfig(config);
      request.setId(id);
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
