import { BufferAttribute, BufferGeometry } from "three";
import {
  getGeometryAttributes,
  getPositionsLength,
  getVertices,
} from "./attributes/attribute.functions";
import { MESH_TRANSFORM } from "../mesh.consts";

export const transformGeometry = (meshTransforms, formattedGeometries) => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  meshTransforms.forEach((transform) => {
    switch (transform.type) {
      case MESH_TRANSFORM.MORPH:
        const morphMeshes = formattedGeometries.filter((geometry) =>
          transform.meshes.includes(geometry.name)
        );

        // TODO - test for same vertex count
        const maxVertexCount = Math.max(
          ...morphMeshes.map(({ geometry }) => getPositionsLength(geometry))
        );
        morphMeshes.forEach((morphTarget, index) => {
          if (index !== 0) {
            const { verticies } = getGeometryAttributes(morphTarget.geometry);

            morphMeshes[0].geometry.setAttribute(
              `morphPosition_${index}`,
              new BufferAttribute(verticies, 3)
            );

            morphMeshes[0].geometry.setAttribute(
              `morphNormal_${index}`,
              new BufferAttribute(verticies, 3)
            );
          }
        });

        const pointIds = new Float32Array(maxVertexCount / 3);
        pointIds.forEach((_value, index) => {
          pointIds[index] = Number(index.toFixed(1));
        });
        morphMeshes[0].geometry.setAttribute(
          "pointIndex",
          new BufferAttribute(pointIds, 1)
        );

        console.log(morphMeshes);
    }
  });
  return formattedGeometries;
};
