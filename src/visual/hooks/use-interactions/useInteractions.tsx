import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { InteractionEventObject } from "./types";
import { getModelType } from "./functions/getModelType";
import { runPosenet } from "./useRunPosenet";
import { EventTracker } from "visual/components/event-tracker";

export const useInteractions = (
  interactionEventObjects: InteractionEventObject[]
) => {
  const modelType = getModelType(interactionEventObjects);

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const webcamRef: React.MutableRefObject<Webcam | null> = useRef(null);

  useEffect(() => {
    if (isInitialized && webcamRef.current) {
      if (modelType === "posenet") {
        runPosenet(webcamRef, interactionEventObjects);
      }
    }
  }, [isInitialized, webcamRef, modelType, interactionEventObjects]);

  tf.ready().then((_) => {
    setIsInitialized(true);
  });

  const eventTracker = new EventTracker(interactionEventObjects);
  const interactiveNode: JSX.Element = (
    <Webcam
      ref={webcamRef}
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        width: 240,
        height: 200,
        visibility: "hidden",
      }}
    />
  );

  return { interactiveNode, eventTracker };
};
