import { BufferAttribute } from "three";
import {
  getGeometryAttributes,
  getVerticesCount,
} from "./attributes/attribute.functions";
import { MESH_TRANSFORM } from "../mesh.consts";
import { MeshTransformConfig } from "../../config.types";
import { FormattedGeometry } from "visual/set-up/assets/geometry/geometry.types";

export const transformGeometry = (
  meshTransforms: MeshTransformConfig[] | undefined,
  formattedGeometries: FormattedGeometry[]
): FormattedGeometry[] => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  meshTransforms.forEach((transform) => {
    switch (transform.type) {
      case MESH_TRANSFORM.MORPH: {
        const morphMeshes = formattedGeometries
          .filter((geometry) =>
            transform.transformedMeshIds.includes(geometry.name ?? "")
          )
          .sort((a, b) => {
            const indexA = transform.transformedMeshIds.indexOf(a.name ?? "");
            const indexB = transform.transformedMeshIds.indexOf(b.name ?? "");
            return indexA - indexB;
          });
        if (!morphMeshes.length) {
          console.warn("no morph meshes selected check your transform");
        }

        const maxVertexCount = Math.max(
          ...morphMeshes.map(({ geometry }) => getVerticesCount(geometry))
        );
        morphMeshes.forEach((morphTarget, index) => {
          if (index !== 0) {
            const { vertices } = getGeometryAttributes(morphTarget.geometry);

            morphMeshes[0].geometry.setAttribute(
              `morphPosition_${index}`,
              new BufferAttribute(vertices, 3)
            );

            morphMeshes[0].geometry.setAttribute(
              `morphNormal_${index}`,
              new BufferAttribute(vertices, 3)
            );
          }
        });

        const pointIds = new Float32Array(maxVertexCount);
        pointIds.forEach((_value, index) => {
          pointIds[index] = Number(index.toFixed(1));
        });
        morphMeshes[0].geometry.setAttribute(
          "pointIndex",
          new BufferAttribute(pointIds, 1)
        );

        const angles = new Float32Array(maxVertexCount);
        angles.forEach((_value, index) => {
          angles[index] = Math.random();
        });
        morphMeshes[0].geometry.setAttribute(
          "angle",
          new BufferAttribute(angles, 1)
        );

        // const random = new Float32Array(maxVertexCount / 3);
        // random.forEach((_value, index) => {
        //   random[index] = parseFloat(
        //     Math.round(Math.random() * 100).toFixed(1)
        //   );
        // });
        // console.log(random);
        // morphMeshes[0].geometry.setAttribute(
        //   "random",
        //   new BufferAttribute(random, 1)
        // );

        const randomBool = new Float32Array(maxVertexCount);
        randomBool.forEach((_value, index) => {
          randomBool[index] = Math.random() < 0.9 ? 1.0 : 0.0;
        });
        morphMeshes[0].geometry.setAttribute(
          "randomBool",
          new BufferAttribute(randomBool, 1)
        );
        const randomBool2 = new Float32Array(maxVertexCount);
        randomBool2.forEach((_value, index) => {
          randomBool2[index] = Math.random() < 0.7 ? 1.0 : 0.0;
        });
        morphMeshes[0].geometry.setAttribute(
          "randomBool2",
          new BufferAttribute(randomBool2, 1)
        );
        return morphMeshes;
      }
      default: {
        return formattedGeometries;
      }
    }
  });
  return formattedGeometries;
};
