import { BoundingBox, ThreeDPosition } from "./position/position.types";

export const createBoundingBox = (
  center: ThreeDPosition,
  width: number,
  height: number,
  depth: number
): BoundingBox => {
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  return {
    min: {
      x: center.x - halfWidth,
      y: center.y - halfHeight,
      z: center.z - halfDepth,
    },
    max: {
      x: center.x + halfWidth,
      y: center.y + halfHeight,
      z: center.z + halfDepth,
    },
  };
};
