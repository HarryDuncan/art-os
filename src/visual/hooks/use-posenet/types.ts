import { EventParam } from "../use-events/types";
import { KEYPOINT_FEATURES } from "./const";

export interface PosenetParams {
  posenetIdentify: IPosenetIdentify[];
}

export interface IPosenetIdentify {
  event: EventParam;
  featureKey: KEYPOINT_FEATURE_KEY;
}

type KEYPOINT_FEATURE = typeof KEYPOINT_FEATURES;
type KEYPOINT_FEATURE_KEY = keyof KEYPOINT_FEATURE;
