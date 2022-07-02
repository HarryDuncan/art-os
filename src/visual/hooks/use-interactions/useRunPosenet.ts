import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { ev } from "../use-events/useEvents";
import { InteractionEventObject, KeypointFeatureKey } from "./types";

export const runPosenet = (
  webcamRef: React.MutableRefObject<Webcam | null>,
  interactionEventObjects: InteractionEventObject[]
) => {
  const featureKeys = interactionEventObjects.map(
    ({ interactionKey }) => interactionKey
  );
  const runPosenetModel = async () => {
    const net = await posenet.load({
      inputResolution: { width: 240, height: 200 },
      architecture: "ResNet50",
      outputStride: 32,
    });

    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net: posenet.PoseNet) => {
    const { current: webcam } = webcamRef;
    if (
      webcam !== null &&
      webcam.video !== null &&
      webcam.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcam.video;
      const videoWidth = webcam.video.videoWidth;
      const videoHeight = webcam.video.videoHeight;

      // Set video width
      webcam.video.width = videoWidth;
      webcam.video.height = videoHeight;
      // Make Detections
      const { keypoints } = await net.estimateSinglePose(video);
      const trackedKeyPoints = featureKeys.map((featureKey) =>
        keypoints.find(
          (keypoint) => featureKey === (keypoint.part as KeypointFeatureKey)
        )
      );
      trackedKeyPoints?.forEach((keypoint) => {
        ev(`:${keypoint?.part}`, keypoint);
      });
    }
  };

  runPosenetModel();
};
