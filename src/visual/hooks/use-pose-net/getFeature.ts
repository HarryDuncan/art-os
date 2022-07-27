import { Keypoint, KeypointFeatureKey } from './types';

export const getFeature = (poseData, featureKey: KeypointFeatureKey) => poseData.find((keypoint: Keypoint) => keypoint.part === featureKey);
