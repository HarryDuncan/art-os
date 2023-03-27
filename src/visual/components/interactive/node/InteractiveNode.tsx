import React, { useEffect, useMemo, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { EventTracker } from "visual/components/event-tracker";
import { runPosenet } from "visual/helpers/interactions/posenet/runPosenet";
import { useAppSelector } from "app/redux/store";
import { ModelTypes } from "visual/helpers/interactions/types";
import { runBodySeg } from "visual/helpers/interactions/body-seg/runBodySeg";

export const InteractiveNode = () => {
  const interactions = useInteractions();
  const modelType = useModelType();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const webcamRef: React.MutableRefObject<Webcam | null> = useRef(null);
  useEffect(() => {
    if (isInitialized && webcamRef.current && interactions.length) {
      switch (modelType) {
        case ModelTypes.BODYSEG:
          runBodySeg(webcamRef);
          break;
        case ModelTypes.POSENET:
        default:
          runPosenet(webcamRef, interactions);
      }
    }
  }, [isInitialized, webcamRef, modelType, interactions]);

  tf.ready().then(() => {
    setIsInitialized(true);
  });

  // @ts-ignore
  new EventTracker(interactions, 0.7);
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
          width: 250,
          height: 190,
          visibility: "hidden",
        }}
      />
    );
  }
  return null;
};

const useInteractions = () => {
  const {
    visualData: { interactions },
  } = useAppSelector((state) => state.visual);
  return useMemo(() => {
    if (interactions) return interactions;
    return [];
  }, [interactions]);
};

const useModelType = (): ModelTypes => {
  const {
    defaultModelType,
    visualData: { modelType },
  } = useAppSelector((state) => state.visual);
  return modelType ?? defaultModelType;
};
