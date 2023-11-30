import { BufferAttribute } from "three";
import {
  getGeometryAttributes,
  getVerticesCount,
} from "../attributes/attribute.functions";
import { MESH_TRANSFORM } from "../../mesh.consts";
import { MeshTransformConfig } from "../../../config.types";
import { FormattedGeometry } from "visual/set-up/assets/geometry/geometry.types";
import { setAttribute } from "../attributes/setAttibutes";

export const transformGeometry = (
  meshTransforms: MeshTransformConfig[] | undefined,
  formattedGeometries: FormattedGeometry[]
): FormattedGeometry[] => {
  if (!meshTransforms || !meshTransforms.length) return formattedGeometries;

  meshTransforms.forEach(({ type, transformedMeshIds, attributeConfig }) => {
    const transformedMeshes = getTransformedMeshes(
      formattedGeometries,
      transformedMeshIds
    );
    console.log(transformedMeshes);
    switch (type) {
      case MESH_TRANSFORM.MORPH: {
        const maxVertexCount = Math.max(
          ...transformedMeshes.map(({ geometry }) => getVerticesCount(geometry))
        );
        transformedMeshes.forEach((morphTarget, index) => {
          if (index !== 0) {
            const { vertices } = getGeometryAttributes(morphTarget.geometry);

            transformedMeshes[0].geometry.setAttribute(
              `morphPosition_${index}`,
              new BufferAttribute(vertices, 3)
            );

            transformedMeshes[0].geometry.setAttribute(
              `morphNormal_${index}`,
              new BufferAttribute(vertices, 3)
            );
          }
        });
        const pointIds = new Float32Array(maxVertexCount);
        pointIds.forEach((_value, index) => {
          pointIds[index] = Number(index.toFixed(1));
        });
        transformedMeshes[0].geometry.setAttribute(
          "pointIndex",
          new BufferAttribute(pointIds, 1)
        );

        const angles = new Float32Array(maxVertexCount);
        angles.forEach((_value, index) => {
          angles[index] = Math.random();
        });
        transformedMeshes[0].geometry.setAttribute(
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
        // transformedMeshes[0].geometry.setAttribute(
        //   "random",
        //   new BufferAttribute(random, 1)
        // );

        const randomBool = new Float32Array(maxVertexCount);
        randomBool.forEach((_value, index) => {
          randomBool[index] = Math.random() < 0.5 ? 1.0 : 0.0;
        });
        transformedMeshes[0].geometry.setAttribute(
          "randomBool",
          new BufferAttribute(randomBool, 1)
        );
        const randomBool2 = new Float32Array(maxVertexCount);
        randomBool2.forEach((_value, index) => {
          randomBool2[index] = Math.random() < 0.01 ? 1.0 : 0.0;
        });
        transformedMeshes[0].geometry.setAttribute(
          "randomBool2",
          new BufferAttribute(randomBool2, 1)
        );
        return transformedMeshes;
      }
      case MESH_TRANSFORM.CUSTOM_ATTRIBUTES: {
        const attributesSet = formattedGeometries.map((formattedGeometry) => {
          const { geometry } = formattedGeometry;
          const setAttributeGeometry = setAttribute(geometry, attributeConfig);
          return { ...formattedGeometry, geometry: setAttributeGeometry };
        });
        return attributesSet;
      }
      default: {
        return formattedGeometries;
      }
    }
  });
  return formattedGeometries;
};

const getTransformedMeshes = (
  formattedGeometries: FormattedGeometry[],
  transformedMeshIds: string[]
) =>
  formattedGeometries
    .filter((geometry) => transformedMeshIds.includes(geometry.name ?? ""))
    .sort((a, b) => {
      const indexA = transformedMeshIds.indexOf(a.name ?? "");
      const indexB = transformedMeshIds.indexOf(b.name ?? "");
      return indexA - indexB;
    });
