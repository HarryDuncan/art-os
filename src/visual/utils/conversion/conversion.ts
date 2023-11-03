import { Vector3 } from "three";
import {
  Position3d,
  PositionConfig,
} from "../three-dimension-space/position/position.types";

export const position3dToVector = (position: PositionConfig) => {
  const { x, y, z } = position;
  return new Vector3(x ?? 0, y ?? 0, z ?? 0);
};

export const vectorToPosition3d = (vector: Vector3) => ({
  x: vector.x,
  y: vector.y,
  z: vector.z,
});
export const vectorToArray = (vector: Vector3) => {
  const { x, y, z } = vector;
  return [x, y, z];
};
export const positionToArray = (position: PositionConfig): number[] =>
  Object.values(position).map((value) => value);

export const positionConfigToPosition = (positionConfig: PositionConfig) => {
  return {
    x: positionConfig.x ?? 0,
    y: positionConfig.y ?? 0,
    z: positionConfig.z ?? 0,
  };
};
