import { BufferGeometry, Vector3 } from "three";
import { Position3d } from "visual/utils/three-dimension-space/position/position.types";

export const nearestPointInBufferGeometry = (
  point: Position3d,
  bufferGeometry: BufferGeometry
) => {
  const positionAttribute = bufferGeometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;
  const numVertices = positions.length / 3;
  const pointAsVector = new Vector3(point.x, point.y, point.z);
  let vertexIndex = 0;
  let nearestDistance = Number.POSITIVE_INFINITY;
  let nearestPoint: Vector3 | null = null;
  // Iterate through all vertices and calculate distances
  for (let i = 0; i < numVertices; i += 1) {
    const x = positions[i * 3];
    const y = positions[i * 3 + 1];
    const z = positions[i * 3 + 2];

    const vertex = new Vector3(x, y, z);
    const distance = pointAsVector.distanceTo(vertex);

    // Check if this vertex is closer than the current nearest vertex
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestPoint = vertex;
      vertexIndex = i;
    }
  }

  return { nearestPoint, vertexIndex };
};
