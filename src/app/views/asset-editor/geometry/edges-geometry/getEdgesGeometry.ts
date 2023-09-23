import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Vector3,
} from "three";
import { getVertexFromPositions } from "../vertex/helpers/getVertexFromPositions";
import { vectorArrayToPositions } from "../vertex/helpers/vectorArrayToPositions";
import { bufferGeometryFromPositions } from "../buffer-geometry/bufferGeometryFromPositions";

export const getEdgesGeometry = (geometry: BufferGeometry) => {
  const edges = new EdgesGeometry(geometry);

  const subdivided = subdivideEdges(edges);
  return subdivided;
};

const subdivideEdges = (edges) => {
  const distanceThreshold = 0.2;
  const positionsAttribute = edges.getAttribute("position");
  const positions = positionsAttribute.array as Float32Array;
  const numVertices = positions.length / 3;
  let prevPoint: Vector3 = new Vector3(0, 0, 0);
  const newPositions: Vector3[] = [];
  for (let i = 0; i < numVertices; i += 1) {
    const vertex = getVertexFromPositions(positions, i);
    if (i !== 0 && i % 2 !== 0) {
      const distance = prevPoint.distanceTo(vertex);
      if (distance > distanceThreshold) {
        const xDif = vertex.x - prevPoint.x;
        const yDif = vertex.y - prevPoint.y;
        const xDirection = xDif > 0 ? 1 : -1;
        const yDirection = yDif > 0 ? 1 : -1;
        const newPosition = new Vector3(0, 0, 0);
        if (xDif !== 0) {
          newPosition.x = vertex.x + (distance / 2) * xDirection;
        }
        if (yDif !== 0) {
          newPosition.y = vertex.y + (distance / 2) * yDirection;
        }
        newPositions.push(newPosition);
      }
    }
    prevPoint = vertex;
    newPositions.push(vertex);
  }

  const newPoints = vectorArrayToPositions(newPositions);
  return bufferGeometryFromPositions(newPoints);
};
