import { BufferGeometry } from "three";
import { createAdditionalVertexArray } from "./createAdditionalVertexArray";

export const retrieveAdditionalVertices = (
  originalBufferGeometry: BufferGeometry | undefined,
  extraVertexCount: number
): number[] => {
  if (!originalBufferGeometry) return [];
  const positionAttribute = originalBufferGeometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;
  return createAdditionalVertexArray(extraVertexCount, positions);
};
