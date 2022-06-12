import { EventParam } from "../use-events/types";
import { KEYPOINT_FEATURES, INTERACTION_EVENTS } from "./const";

export interface InteractionEventObject {
  interactionKey: InteractionKey;
  eventKey: EventKey;
  // TODO generic type
  eventFunction?: any;
}

export type InteractionKey = KeypointFeatureKey;

export type ModelType = "posenet";

export enum EventKey {
  SwipeLeft = "SWIPELEFT",
  SwipeRight = "SWIPERIGHT",
  SwipeUp = "SWIPEUP",
  SwipeDown = "SWIPEDOWN",
  SwipeHorizontal = "SWIPEHORIZONTAL",
  SwipeVertical = "SWIPEVERTICAL",

  SlideX = "SLIDEX",
  SlideY = "SLIDEY",

  Position = "Position",
}

// <------------------ POSENET --------------------->

export type KeypointFeature = typeof KEYPOINT_FEATURES;
export type KeypointFeatureKey = keyof KeypointFeature;

export type Keypoint = {
  part: KeypointFeatureKey;
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
