import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { EventTracker } from "visual/components/event-tracker";
import { InteractionEventObject } from "./types";
import { getModelType } from "./functions/getModelType";
import { runPosenet } from "./useRunPosenet";

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

  tf.ready().then(() => {
    setIsInitialized(true);
  });

  const eventTracker = new EventTracker(interactionEventObjects, 0.7);
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
        width: 440,
        height: 400,
        visibility: "hidden",
      }}
    />
  );

  return { interactiveNode, eventTracker };
};
