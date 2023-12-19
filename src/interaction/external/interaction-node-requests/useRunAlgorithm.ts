import { useAppSelector } from "app/redux/store";
import { dispatchInteractionEvent } from "interaction/external/dispatched-event";
import { RunAlgorithmRequest } from "interaction/external/protos/interactionNode_pb";
import { useCallback } from "react";
import {
  EXTERNAL_INTERACTION_EVENT_KEYS,
  INTERACTION_NODE_CLIENT,
} from "../interactions.constants";

export const useRunAlgorithm = () => {
  const { isInitialized, isAlgorithmInitialized } = useAppSelector(
    (state) => state.interactionNode
  );
  return useCallback(() => {
    if (!isInitialized) {
      console.warn("interaction node not initialized");
      return;
    }
    if (!isAlgorithmInitialized) {
      console.warn(`algorithm not initialized`);
    }
    const request = new RunAlgorithmRequest();
    const client = INTERACTION_NODE_CLIENT;
    const stream = client.runAlgorithm(request);
    stream.on("data", (response) => {
      // handle each response message here
      const points = response.getPointsList();
      const pointData = getPoints(points);
      dispatchInteractionEvent(
        EXTERNAL_INTERACTION_EVENT_KEYS.POSITION_UPDATE,
        pointData
      );
    });

    stream.on("error", (error) => {
      // handle any errors here
      console.error("Error:", error);
    });

    stream.on("end", () => {
      // handle the end of the stream here
      console.warn("Stream ended");
    });
  }, [isInitialized]);
};

const getPoints = (pointsArray) => {
  return pointsArray.map(({ array }) => ({ x: array[0], y: array[1] }));
};
