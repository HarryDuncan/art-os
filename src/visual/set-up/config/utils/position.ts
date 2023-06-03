import { ThreeDPosition } from "visual/display/helpers/three-dimension-space/position/position.types";

export const getPosition = (positionConfig: Partial<ThreeDPosition>) => {
  return {
    x: positionConfig.x ?? 0,
    y: positionConfig.x ?? 0,
    z: positionConfig.z ?? 0,
  };
};
