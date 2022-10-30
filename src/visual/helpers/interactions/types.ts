import { KEYPOINT_FEATURES } from "./const";

export interface InteractionEventObject {
  interactionKey: InteractionKey;
  eventKey: EventKey;
  binding: Binding;
  meshIdBinding?: string;
  eventFunction?: (materialReference, eventDetails) => void;
}

export enum Binding {
  InteractiveMesh = "interactiveMesh",
  InteractiveScene = "interactiveScene",
}

export type InteractionKey = KeypointFeatureKey | BodySegInteractionKeys;

export enum ModelTypes {
  POSENET = "posenet",
  BODYSEG = "bodySegmentation",
}

export enum EventKey {
  SwipeLeft = "SWIPE_LEFT",
  SwipeRight = "SWIPE_RIGHT",
  SwipeUp = "SWIPE_UP",
  SwipeDown = "SWIPE_DOWN",
  SwipeHorizontal = "SWIPE_HORIZONTAL",
  SwipeVertical = "SWIPE_VERTICAL",
  Scale = "SCALE",
  Position = "POSITION",
  MultiplePositions = "MULTIPLE_POSITIONS",
}

export enum BodySegInteractionKeys {
  PersonPosition = "personPosition",
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
