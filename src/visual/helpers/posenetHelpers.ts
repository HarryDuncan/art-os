import { MovementPosition } from "visual/hooks/use-pose-net/types";

export const getPosenetDetailFromEvent = (
  customEvent: any
): MovementPosition => {
  const {
    detail: { position, part, score },
    timeStamp,
  } = customEvent;

  return {
    position,
    part,
    score,
    timeStamp,
  };
};

export const getFeature = (poseData, featureKey) =>
  poseData.find((keypoint) => keypoint.part === featureKey);
