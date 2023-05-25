import { Vector3 } from "three";

export const setObjectPosition = (object, position: Vector3) => {
  const { x, y, z } = position;
  object.position.set(x, y, z);
};
