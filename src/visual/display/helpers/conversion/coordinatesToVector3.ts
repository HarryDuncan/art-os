import { Vector3 } from "three";
import { ThreeDPosition } from "../three-dimension-space/position/position.types";

export const coordinatesToVector3 = (coordinate: ThreeDPosition) =>
  new Vector3(coordinate.x, coordinate.y, coordinate.z);
