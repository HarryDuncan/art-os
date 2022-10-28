import React, { useEffect, useMemo, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { EventTracker } from "visual/components/event-tracker";
import { runPosenet } from "visual/helpers/interactions/posenet/runPosenet";
import { getModelType } from "visual/helpers/interactions/getModelType";
import { useAppSelector } from "app/redux/store";

export const InteractiveNode = () => {
  const interactions = useInteractions();
  const modelType = useMemo(() => getModelType(interactions), [interactions]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const webcamRef: React.MutableRefObject<Webcam | null> = useRef(null);

  useEffect(() => {
    if (isInitialized && webcamRef.current && interactions.length) {
      if (modelType === "posenet") {
        runPosenet(webcamRef, interactions);
      }
    }
  }, [isInitialized, webcamRef, modelType, interactions]);

  tf.ready().then(() => {
    setIsInitialized(true);
  });

  const eventTracker = new EventTracker(interactions, 0.7);
  if (interactions.length) {
    return (
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
  }
  return null;
};

const useInteractions = () => {
  const {
    visualData: { interactionEvents },
  } = useAppSelector((state) => state.visual);
  return useMemo(() => {
    if (interactionEvents) return interactionEvents;
    return [];
  }, []);
};
