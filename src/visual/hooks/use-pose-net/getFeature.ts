import { Keypoint, KEYPOINT_FEATURE_KEY } from "./types";

export const getFeature = (poseData, featureKey: KEYPOINT_FEATURE_KEY) => {
  return poseData.find((keypoint: Keypoint) => keypoint.part === featureKey);
};
