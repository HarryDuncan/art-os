import { BufferAttribute, BufferGeometry } from "three";
import {
  getGeometryAttributes,
  getPositionsLength,
  getVertices,
} from "./attributes/attribute.functions";
import { MESH_TRANSFORM } from "../mesh.consts";
import { normalize } from "path";

export const transformGeometry = (meshTransforms, formattedGeometries) => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  meshTransforms.forEach((transform) => {
    switch (transform.type) {
      case MESH_TRANSFORM.MORPH:
        const morphMeshes = formattedGeometries.filter((geometry) =>
          transform.meshes.includes(geometry.name)
        );
        const maxVertexCount = Math.max(
          ...morphMeshes.map(({ geometry }) => getPositionsLength(geometry))
        );

        morphMeshes.forEach((mesh) => {
          const vertexCount = getPositionsLength(mesh.geometry);
          if (vertexCount < maxVertexCount) {
            const currentVertices = getVertices(mesh.geometry);

            const addedVertices = new Array(maxVertexCount - vertexCount).fill(
              0
            );

            const totalLength = vertexCount + addedVertices.length;
            const combinedArray = new Float32Array(totalLength);
            combinedArray.set(currentVertices, 0);
            combinedArray.set(addedVertices, currentVertices.length);

            // mesh.geometry.setAttribute(
            //   "position",
            //   new BufferAttribute(combinedArray, totalLength, true)
            // );

            // geometry
            const newGeometry = new BufferGeometry();

            newGeometry.setAttribute(
              "position",
              new BufferAttribute(combinedArray, 3)
            );

            newGeometry.setDrawRange(0, vertexCount);

            // // If you need to update the render, for example, if the mesh is already in the scene
            newGeometry.computeBoundingSphere(); // Recalculate bounding sphere
            newGeometry.computeVertexNormals(); // Recalculate vertex normals if needed

            mesh.geometry = newGeometry; // Mark the attribute as needing an update
          }
        });

        const morphTarget = morphMeshes[1];
        console.log(morphTarget);
        const { normals, verticies } = getGeometryAttributes(
          morphTarget.geometry
        );

        morphMeshes[0].geometry.setAttribute(
          "morphPosition",
          new BufferAttribute(verticies, 3)
        );
        console.log(morphMeshes);
    }
  });
  return formattedGeometries;
};
