//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as posenet from "@tensorflow-models/posenet";
// import Webcam from "react-webcam";
import * as THREE from "three";

export const usePosenet = () => {
  const webcamRef = useRef(null);

  // const runPosenet = async () => {
  //   const net = await posenet.load({
  //     inputResolution: { width: 240, height: 200 },
  //     scale: 0.8,
  //   });

  //   //
  //   setInterval(() => {
  //     detect(net);
  //   }, 200);
  // };

  // const detect = async (net) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Make Detections
  //     const pose = await net.estimateSinglePose(video);
  //     const leftWrist = pose.keypoints[10];

  //     if (leftWrist.score > 0.85) {
  //       xPos = leftWrist.position.x;
  //       yPos = leftWrist.position.y;
  //     }
  //     setIsLoading(false);

  //     // console.log(`x: ${leftWristXPos * 100}%`);
  //     // console.log(`y: ${leftWristYPos * 100}%`);
  //     //   drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
  //   }
  // };
  // tf.ready().then((_) => {
  //   setTimeout(() => {
  //     runPosenet();
  //   }, 1500);
  // });

  const posenetNode: JSX.Element = <></>;

  return { posenetNode };
};
// };
// <Webcam
// ref={webcamRef}
// style={{
//   position: "absolute",
//   marginLeft: "auto",
//   marginRight: "auto",
//   left: 0,
//   right: 0,
//   textAlign: "center",
//   zindex: -1,
//   width: 240,
//   height: 200,
//   visibility: "hidden",
// }}
// />
