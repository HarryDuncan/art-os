import { BufferGeometry, Float32BufferAttribute } from "three";

export const bufferGeometryFromPositions = (positions) => {
  // Create a new BufferGeometry
  const bufferGeometry = new BufferGeometry();

  // Set the 'position' attribute of the BufferGeometry with your positions array
  bufferGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(positions, 3)
  );
  bufferGeometry.setDrawRange(0, positions.length);
  bufferGeometry.computeBoundingSphere();
  bufferGeometry.computeVertexNormals();
  return bufferGeometry;
};
