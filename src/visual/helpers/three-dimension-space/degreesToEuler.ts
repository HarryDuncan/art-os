import { Vector3 } from "three";

export const degreesToEuler = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const vector3DegreesToEuler = (xyzObject: Vector3) => ({
  x: degreesToEuler(xyzObject.x),
  y: degreesToEuler(xyzObject.y),
  z: degreesToEuler(xyzObject.z),
});
