import { BufferGeometry } from "three";

export const retrieveAdditionalVertices = (
  originalBufferGeometry: BufferGeometry,
  extraVertexCount: number
): number[] => {
  const positionAttribute = originalBufferGeometry.getAttribute("position");
  const positions = positionAttribute.array as Float32Array;
  const positionsCount = positions.length - 1;
  return new Array(extraVertexCount).fill("").map((_item, index) => {
    const axis = index % 3;
    const multiplier = (index % positionsCount) % 2;
    let geometryVertexIndex = positionsCount - index * multiplier;
    if (axis === 0) {
      geometryVertexIndex -= 2;
    }
    if (axis === 2) {
      geometryVertexIndex += 2;
    }
    return positions[geometryVertexIndex];
  });
};
