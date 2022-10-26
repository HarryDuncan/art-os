import React, { useEffect, useMemo, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { EventTracker } from "visual/components/event-tracker";
import { InteractionEventObject } from "visual/helpers/interactions/types";
import { runPosenet } from "visual/helpers/interactions/posenet/runPosenet";
import { getModelType } from "visual/helpers/interactions/getModelType";

export const InteractiveNode = ({
  interactions,
}: {
  interactions: InteractionEventObject[];
}) => {
  const modelType = useMemo(() => getModelType(interactions), [interactions]);

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const webcamRef: React.MutableRefObject<Webcam | null> = useRef(null);

  useEffect(() => {
    if (isInitialized && webcamRef.current) {
      if (modelType === "posenet") {
        runPosenet(webcamRef, interactions);
      }
    }
  }, [isInitialized, webcamRef, modelType, interactions]);

  tf.ready().then(() => {
    setIsInitialized(true);
  });

  new EventTracker(interactions, 0.7);
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
};
