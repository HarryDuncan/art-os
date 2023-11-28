import { Mesh } from "three";
import { Position3d } from "visual/utils/three-dimension-space/position/position.types";
import { calculatePositionDistance } from "visual/utils/three-dimension-space/calculatePositionDistance";

export const moveObject = (
  mesh: Mesh,
  progress: number,
  moveTo: Position3d,
  moveFrom: Position3d,
  count: number
) => {
  // assumes initial position is 0,0,0
  const prog = count % 2 === 0 ? 1.0 - progress : progress;
  // get distance for each axis
  const distance = calculatePositionDistance(moveFrom, moveTo);
  // set obj position as distance * progress
  const newX = moveFrom.x + distance.x * prog;
  const newY = moveFrom.y + distance.y * prog;
  const newZ = moveFrom.z + distance.z * prog;
  mesh.position.set(newX, newY, newZ);
};
