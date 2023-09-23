import { Vector3 } from "three";

export const getVertexFromPositions = (
  positions: Float32Array,
  vertexIndex: number
) => {
  const x = positions[vertexIndex * 3];
  const y = positions[vertexIndex * 3 + 1];
  const z = positions[vertexIndex * 3 + 2];
  return new Vector3(x, y, z);
};
