import { BufferAttribute, BufferGeometry } from "three";
import { getVerticesCount } from "../attribute.functions";
import { AttributeConfig } from "visual/set-up/config/material/shaders/build-shader/buildShader.types";

export const setAttributes = (
  bufferGeometry: BufferGeometry,
  attributeConfig: AttributeConfig[] = []
) => {
  const vertexCount = getVerticesCount(bufferGeometry);
  attributeConfig.forEach(({ id, valueConfig }) => {
    if (id.indexOf("randomAngle") !== -1) {
      const angles = new Float32Array(vertexCount);
      angles.forEach((_value, index) => {
        angles[index] = Math.random();
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(angles, 1));
    }
    if (id.indexOf("pointIndex") !== -1) {
      const pointIds = new Float32Array(vertexCount);
      pointIds.forEach((_value, index) => {
        pointIds[index] = Number(index.toFixed(1));
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(pointIds, 1));
    }

    if (id.indexOf("randomBool") !== -1) {
      const { randomizedPercentage } = valueConfig ?? {
        randomizedPercentage: 0.5,
      };
      const randomBool = new Float32Array(vertexCount);
      randomBool.forEach((_value, index) => {
        randomBool[index] = Math.random() < randomizedPercentage ? 1.0 : 0.0;
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(randomBool, 1));
    }
    if (id === "pointType") {
      const points = new Float32Array(vertexCount);
      points.forEach((_value, index) => {
        points[index] = Math.random();
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(points, 1));
    }
    if (id === "pointDisplay") {
      const { randomizedPercentage } = valueConfig ?? {
        randomizedPercentage: 0.01,
      };
      const randomBool = new Float32Array(vertexCount);
      randomBool.forEach((_value, index) => {
        randomBool[index] = Math.random() < randomizedPercentage ? 1.0 : 0.0;
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(randomBool, 1));
    }
  });

  return bufferGeometry;
};
