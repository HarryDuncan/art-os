import { BufferGeometry, Vector3 } from "three";
import { bufferGeometryFromPositions } from "../../buffer-geometry/bufferGeometryFromPositions";
import { getVertexFromPositions } from "../helpers/getVertexFromPositions";
import { vectorArrayToPositions } from "../helpers/vectorArrayToPositions";

export const subdivideByVertexDistance = (geometry: BufferGeometry) => {
  const distanceThreshold = 0.003;
  const positionsAttribute = geometry.getAttribute("position");
  const positions = positionsAttribute.array as Float32Array;
  const numVertices = positions.length / 3;
  let prevPoint: Vector3 = new Vector3(0, 0, 0);
  const newPositions: Vector3[] = [];
  for (let i = 0; i < numVertices; i += 1) {
    const vertex = getVertexFromPositions(positions, i);
    if (i !== 0) {
      const distance = prevPoint.distanceTo(vertex);
      if (distance > distanceThreshold && !isNaN(distance)) {
        const x = (vertex.x + prevPoint.x) / 2;
        const y = (vertex.y + prevPoint.y) / 2;
        const z = (vertex.z + prevPoint.z) / 2;
        const newVertex = new Vector3(x, y, z);

        newPositions.push(newVertex);
      }
    }
    prevPoint = vertex;
    newPositions.push(vertex);
  }

  const newPoints = vectorArrayToPositions(newPositions);
  return bufferGeometryFromPositions(newPoints);
};
