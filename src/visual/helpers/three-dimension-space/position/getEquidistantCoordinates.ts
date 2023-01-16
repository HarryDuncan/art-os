import { AXIS, BoundingBox, ThreeDPosition } from "./position.types";

export const getEquidistantCoordinates = (
  numCoordinates: number,
  boundingBox: BoundingBox,
  axis: AXIS
): ThreeDPosition[] => {
  let interval: number;
  switch (axis) {
    case AXIS.X:
      const maxX = boundingBox.max.x;
      const minX = boundingBox.min.x;
      interval = (maxX - minX) / (numCoordinates + 1);
      return new Array(numCoordinates).fill("").map((_value, index) => ({
        x: minX + interval * index,
        y: 0,
        z: 0,
      }));
    case AXIS.Y:
      const maxY = boundingBox.max.y;
      const minY = boundingBox.min.y;
      interval = (maxY - minY) / (numCoordinates + 1);
      return new Array(numCoordinates).fill("").map((_value, index) => ({
        x: 0,
        y: minY + interval * index,
        z: 0,
      }));
    case AXIS.Z:
      const maxZ = boundingBox.max.z;
      const minZ = boundingBox.min.z;
      interval = (maxZ - minZ) / (numCoordinates + 1);
      return new Array(numCoordinates).fill("").map((_value, index) => ({
        x: 0,
        y: 0,
        z: minZ + interval * index,
      }));
  }
};
