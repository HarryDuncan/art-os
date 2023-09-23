// @ts-nocheck
import { Box3, BufferGeometry, Vector3 } from "three";

export const translateToOrigin = (bufferGeometry: BufferGeometry) => {
  // Step 1: Find the bounding box
  const boundingBox = new Box3();
  // @ts-ignore
  boundingBox.setFromBufferAttribute(bufferGeometry.attributes.position);

  // Step 2: Calculate the center of the bounding box
  const boundingBoxCenter = new Vector3();
  boundingBox.getCenter(boundingBoxCenter);

  // Step 3: Calculate the translation required
  const desiredMargin = 0.2;
  const translation = new Vector3().subVectors(
    new Vector3(0, 0, 0),
    boundingBoxCenter
  );

  // Add the desired margin to the translation
  translation.multiplyScalar(1 + desiredMargin);

  // Step 4: Apply the translation to all vertices
  const positions = bufferGeometry.attributes.position.array;
  const numVertices = positions.length / 3;

  for (let i = 0; i < numVertices; i += 1) {
    positions[i * 3] += translation.x;
    positions[i * 3 + 1] += translation.y;
    positions[i * 3 + 2] += translation.z;
  }
};
