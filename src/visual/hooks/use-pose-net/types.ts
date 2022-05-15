import { EventParam } from "../use-events/types";
import { KEYPOINT_FEATURES } from "./const";

export interface PosenetParams {
  posenetIdentify: IPosenetIdentify[];
}

export interface IPosenetIdentify {
  event: EventParam;
  featureKey: KEYPOINT_FEATURE_KEY;
}

export type KEYPOINT_FEATURE = typeof KEYPOINT_FEATURES;
export type KEYPOINT_FEATURE_KEY = keyof KEYPOINT_FEATURE;

export type Keypoint = {
  part: KEYPOINT_FEATURE_KEY;
  position: KeypointPosition;
  score: number;
};

export type MovementPosition = Keypoint & { timeStamp: number };

export type KeypointPosition = {
  x: number;
  y: number;
};

export type PoseNetOutputStride = 32 | 16 | 8;
export type PoseNetArchitecture = "ResNet50" | "MobileNetV1";
export type PoseNetDecodingMethod = "single-person" | "multi-person";
export type PoseNetQuantBytes = 1 | 2 | 4;

export type MobileNetMultiplier = 0.5 | 0.75 | 1.0;
