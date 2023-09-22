import { Position3d } from "visual/display/helpers/three-dimension-space/position/position.types";

export const fillPoints = (
  vertexCount: number,
  coordinates: Position3d = { x: 0, y: 0, z: 0 }
): number[] =>
  new Array(vertexCount).fill(0).map((_value, index) => {
    const axis = index % 3;
    if (axis === 0) {
      return coordinates.x;
    }
    if (axis === 1) {
      return coordinates.y;
    }
    return coordinates.z;
  });
