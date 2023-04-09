import { useAppDispatch, useAppSelector } from "app/redux/store";
import { dispatchInteractionEvent } from "interaction-node/dispatched-event";
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
    const stream = client.runAlgorithm(request);
    stream.on("data", (response) => {
      // handle each response message here
      const point = response.getPoint();
      // @ts-ignore
      const pointData = { x: point.array[0], y: point.array[1] };

      dispatchInteractionEvent("update:position", pointData);
    });

    stream.on("error", (error) => {
      // handle any errors here
      console.error("Error:", error);
    });

    stream.on("end", () => {
      // handle the end of the stream here
      console.log("Stream ended");
    });
  }, [isInitialized]);
};
