import { BufferAttribute, BufferGeometry } from "three";
import { generateSinCurvePoints } from "./createCurves";
import {
  getPositionsLength,
  getVertexArray,
} from "visual/set-up/config/mesh/geometry/attributes/attribute.functions";
import { retrieveAdditionalVertices } from "../retrieve-additional-verticies/retrieveAdditionalVertices";

export const addAdditionalVerticies = (
  geometry: BufferGeometry,
  originalBufferGeometry: BufferGeometry | undefined
) => {
  const currentVertices = getVertexArray(geometry);
  const additional = createAdditionalVertices(geometry, 5000);
  const vertexCount = getPositionsLength(geometry);
  const combinedVertices = [...currentVertices, ...additional];
  const totalLength = vertexCount + additional.length;
  const combinedArray = new Float32Array(totalLength);
  combinedArray.set(combinedVertices, 0);
  const newGeometry = new BufferGeometry();
  newGeometry.setAttribute("position", new BufferAttribute(combinedArray, 3));
  newGeometry.setDrawRange(0, vertexCount);
  newGeometry.computeBoundingSphere();
  newGeometry.computeVertexNormals();
  return newGeometry;
};

const createAdditionalVertices = (
  originalBufferGeometry: BufferGeometry | undefined,
  extraVertexCount: number
): number[] => {
  if (!originalBufferGeometry) return [];
  const positionAttribute = originalBufferGeometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;
  const positionsCount = positions.length - 1;
  return new Array(extraVertexCount).fill("").map((_item, index) => {
    const axis = index % 3;
    const multiplier = (Math.floor(index / positionsCount) + 1) % 2;
    console.log(multiplier);
    const m = -1 * multiplier === -1 ? -1 : 1;
    let geometryVertexIndex = positionsCount - index * m;
    if (axis === 0) {
      geometryVertexIndex -= 2;
    }
    if (axis === 2) {
      geometryVertexIndex -= 2;
    }
    return positions[geometryVertexIndex];
  });
};
