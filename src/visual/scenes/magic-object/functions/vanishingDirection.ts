import { Vector2 } from "three";
import { DIRECTIONS, DIRECTION_KEYS } from "../magic-object-params";

type directions = typeof DIRECTION_KEYS;
type DirectionKey = keyof directions;
export const getVanishingDirection = (
  currentVanishingDirection: Vector2,
  directionKey?: DirectionKey
) => {
  if (directionKey) {
    return DIRECTIONS[directionKey];
  }
  // Returns the opposite of the current vanishing direction
  return new Vector2(
    currentVanishingDirection.x * -1,
    currentVanishingDirection.y * -1
  );
};
