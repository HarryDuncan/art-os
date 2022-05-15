import { Keypoint, KeypointFeatureKey } from "./types";

export const getFeature = (poseData, featureKey: KeypointFeatureKey) => {
  return poseData.find((keypoint: Keypoint) => keypoint.part === featureKey);
};
