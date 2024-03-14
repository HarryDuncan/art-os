import { BufferAttribute, BufferGeometry } from "three";
import {
  getPositionsLength,
  getVertexArray,
} from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";
import { retrieveAdditionalVertices } from "./retrieve-additional-verticies/retrieveAdditionalVertices";

export const setSameVertexCount = (
  geometry: BufferGeometry,
  originalBufferGeometry: BufferGeometry | undefined,
  maxVertexCount: number
) => {
  const currentVertices = getVertexArray(geometry);
  const vertexCount = getPositionsLength(geometry);
  const extraVertexCount = maxVertexCount - vertexCount;
  if (extraVertexCount <= 0) {
    return geometry;
  }
  const additional = retrieveAdditionalVertices(
    originalBufferGeometry,
    extraVertexCount
  );
  const totalLength = vertexCount + extraVertexCount;
  const combinedVertices = [...currentVertices, ...additional];
  const combinedArray = new Float32Array(totalLength);
  combinedArray.set(combinedVertices, 0);
  const newGeometry = new BufferGeometry();
  newGeometry.setAttribute("position", new BufferAttribute(combinedArray, 3));

  newGeometry.setDrawRange(0, vertexCount);
  newGeometry.computeBoundingSphere();
  newGeometry.computeVertexNormals();
  return newGeometry;
};
