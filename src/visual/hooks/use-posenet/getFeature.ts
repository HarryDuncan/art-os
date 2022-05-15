export const getFeature = (poseData, featureKey) => {
  return poseData.find((keypoint) => keypoint.part === featureKey);
};
