//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import * as THREE from "three";
import { getFeature } from "./getFeature";
import { KEYPOINT_FEATURES } from "./const";
import { ev } from "../use-events/useEvents";

export const usePosenet = (posenetParams: PosenetParams) => {
  const { posenetIdentify } = posenetParams;
  const [isPosenetInitialized, setIsPosenetInitialized] = useState<boolean>(
    false
  );
  const webcamRef = useRef(null);

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 240, height: 200 },
      scale: 0.8,
    });

    //
    setInterval(() => {
      detect(net);
    }, 200);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
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
        zindex: -1,
        width: 240,
        height: 200,
        visibility: "hidden",
      }}
    />
  );

  return { posenetNode };
};
// };
