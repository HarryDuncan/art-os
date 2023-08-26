import { BufferAttribute } from "three";
import {
  getGeometryAttributes,
  getVerticiesCount,
} from "./attributes/attribute.functions";
import { MESH_TRANSFORM } from "../mesh.consts";

export const transformGeometry = (meshTransforms, formattedGeometries) => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  meshTransforms.forEach((transform) => {
    switch (transform.type) {
      case MESH_TRANSFORM.MORPH:
        const morphMeshes = formattedGeometries
          .filter((geometry) => transform.meshes.includes(geometry.name))
          .sort((a, b) => {
            const indexA = transform.meshes.indexOf(a.name);
            const indexB = transform.meshes.indexOf(b.name);
            return indexA - indexB;
          });
        if (!morphMeshes.length) {
          console.warn("no morph meshes selected check your transform");
        }

        // TODO - test for same vertex count
        const maxVertexCount = Math.max(
          ...morphMeshes.map(({ geometry }) => getVerticiesCount(geometry))
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

        return morphMeshes;
    }
  });
  return formattedGeometries;
};
