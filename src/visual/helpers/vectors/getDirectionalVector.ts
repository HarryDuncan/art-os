import { Vector2 } from "three";
import { DIRECTIONS } from "./consts";
import { DirectionKey } from "./types";

export const getDirectionalVector = ({
  referenceVector,
  directionKey,
}: {
  referenceVector?: Vector2;
  directionKey?: DirectionKey;
}) => {
  if (directionKey) {
    return DIRECTIONS[directionKey];
  }

  if (referenceVector) {
    // Returns the opposite of the current vanishing direction
    return new Vector2(referenceVector.x * -1, referenceVector.y * -1);
  }
  return null;
};
