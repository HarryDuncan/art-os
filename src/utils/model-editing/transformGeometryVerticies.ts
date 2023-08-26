import { BufferAttribute, BufferGeometry } from "three";
import {
  getPositionsLength,
  getVertices,
} from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";

export const transformGeometryVerticies = (geometry, maxVertexCount) => {
  const currentVertices = getVertices(geometry);
  const vertexCount = getPositionsLength(geometry);
  const addedVerticesCount = maxVertexCount - vertexCount;
  if (addedVerticesCount <= 0) {
    return geometry;
  }
  const addedVertices1 = new Array(addedVerticesCount / 4).fill(0);

  const addedVertices2 = new Array(addedVerticesCount / 4).fill(0.2);
  const addedVertices3 = new Array(addedVerticesCount / 4).fill(0.45);
  const remainder = addedVerticesCount - (addedVerticesCount / 4) * 3;
  const addedVertices4 = new Array(remainder).fill(0.5);
  const allAdded = [
    ...addedVertices1,
    ...addedVertices2,
    ...addedVertices3,
    ...addedVertices4,
  ];
  const totalLength = vertexCount + addedVerticesCount;
  const combinedArray = new Float32Array(totalLength);
  combinedArray.set(currentVertices, 0);
  combinedArray.set(allAdded, currentVertices.length);
  const newGeometry = new BufferGeometry();

  newGeometry.setAttribute("position", new BufferAttribute(combinedArray, 3));

  newGeometry.setDrawRange(0, vertexCount);

  // // If you need to update the render, for example, if the mesh is already in the scene
  newGeometry.computeBoundingSphere(); // Recalculate bounding sphere
  newGeometry.computeVertexNormals(); // Recalculate vertex normals if needed

  return newGeometry; // Mark the attribute as needing an update
};
