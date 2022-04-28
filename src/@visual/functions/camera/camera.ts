import { PerspectiveCamera } from "three";

export const setUpDefaultCamera = (x = 0, y = 0, z = 0) => {
  const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight > 1
      ? window.innerWidth / window.innerHeight
      : 1.0,
    1,
    10000
  );
  camera.position.set(x, y, z);

  return camera;
};

export type TCameraDimension = "x" | "y" | "z";
export const moveCamera = (
  camera,
  dimension,
  movementFunction,
  scrub,
  speed
) => {
  camera[dimension] = movementFunction(scrub, speed);
};
