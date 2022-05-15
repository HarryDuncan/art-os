import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { getFeature } from "./getFeature";
import { ev } from "../use-events/useEvents";
import { PosenetParams } from "./types";

export const usePoseNet = (posenetParams: PosenetParams) => {
  const { posenetIdentify } = posenetParams;
  const [isPosenetInitialized, setIsPosenetInitialized] = useState<boolean>(
    false
  );
  const webcamRef: React.MutableRefObject<any> = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 240, height: 200 },
      architecture: "ResNet50",
      outputStride: 32,
    });

    setInterval(() => {
      detect(net);
    }, 200);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current?.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      posenetIdentify.forEach(({ event, featureKey }) => {
        const keyPoints = getFeature(pose.keypoints, featureKey);
        ev(event.key, keyPoints);
      });
    }
  };

  useEffect(() => {
    if (isPosenetInitialized) {
      runPosenet();
    }
  }, [isPosenetInitialized]);

  tf.ready().then((_) => {
    setIsPosenetInitialized(true);
  });

  const posenetNode: JSX.Element = (
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

  return { posenetNode };
};
// };
