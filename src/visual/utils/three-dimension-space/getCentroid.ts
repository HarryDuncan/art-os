import { Vector3 } from "three";

export const getCentroid = (vectors: Vector3[]) => {
  const center = new Vector3();
  vectors.forEach((vector) => {
    center.add(vector);
  });
  center.divideScalar(vectors.length);
  return center;
};
