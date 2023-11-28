// @ts-nocheck
import { BufferGeometry, Float32BufferAttribute } from "three";

export const splitGeometry = (originalGeometry, numberOfGeometries) => {
  // Create an array to hold the new geometries
  const splitGeometries = Array.from(
    { length: numberOfGeometries },
    () => new BufferGeometry()
  );

  // Access the attributes of the original geometry
  const { attributes } = originalGeometry;

  // Calculate the number of vertices
  const vertexCount = attributes.position.count;

  // Calculate the number of vertices per geometry
  const verticesPerGeometry = Math.floor(vertexCount / numberOfGeometries);

  // Calculate the remainder vertices
  const remainderVertices = vertexCount % numberOfGeometries;

  // Arrays to store the data for the new geometries
  const verticesArrays = Array.from({ length: numberOfGeometries }, () => []);
  const normalsArrays = Array.from({ length: numberOfGeometries }, () => []);
  const indicesArrays = Array.from({ length: numberOfGeometries }, () => []);

  // Iterate through the vertices and indices of the original geometry
  for (let i = 0; i < vertexCount; i++) {
    const geometryIndex = Math.min(
      Math.floor(i / verticesPerGeometry),
      numberOfGeometries - 1
    );

    // Push vertex data to the corresponding array
    verticesArrays[geometryIndex].push(
      attributes.position.getX(i),
      attributes.position.getY(i),
      attributes.position.getZ(i)
    );
    normalsArrays[geometryIndex].push(
      attributes.normal.getX(i),
      attributes.normal.getY(i),
      attributes.normal.getZ(i)
    );
    indicesArrays[geometryIndex].push(i);
  }

  // Set the data for the new geometries
  for (let i = 0; i < numberOfGeometries; i++) {
    const geometry = splitGeometries[i];
    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(verticesArrays[i], 3)
    );
    geometry.setAttribute(
      "normal",
      new Float32BufferAttribute(normalsArrays[i], 3)
    );
    geometry.setIndex(indicesArrays[i]);

    // Now, splitGeometries[i] contains the split geometry
  }
  return splitGeometries;
};
