import { BufferAttribute, BufferGeometry } from "three";
import { getVerticesCount } from "../attribute.functions";
import { AttributeConfig } from "visual/set-up/config/material/shaders/build-shader/buildShader.types";

const RANDOM_ATTRIBUTE_IDS = ["randomAngle", "random", "pointType"];
const INDEX_ATTRIBUTE_IDS = ["pointIndex", "index"];
const RANDOMIZED_ATTRIBUTE_IDS = ["pointDisplay", "signDirection"];

export const setAttributes = (
  bufferGeometry: BufferGeometry,
  attributeConfig: AttributeConfig[] = []
) => {
  const vertexCount = getVerticesCount(bufferGeometry);
  attributeConfig.forEach(({ id, valueConfig }) => {
    if (checkIds(id, RANDOM_ATTRIBUTE_IDS)) {
      setRandomValues(id, vertexCount, bufferGeometry);
    } else if (checkIds(id, INDEX_ATTRIBUTE_IDS)) {
      setIndexValues(id, vertexCount, bufferGeometry);
    } else if (checkIds(id, RANDOMIZED_ATTRIBUTE_IDS)) {
      setRandomizedPercentage(id, vertexCount, bufferGeometry, valueConfig);
    }
  });
  return bufferGeometry;
};

const checkIds = (id, allowedIds) =>
  allowedIds.some((allowedId) => id.indexOf(allowedId) !== -1);

const setIndexValues = (attributeId, vertexCount, bufferGeometry) => {
  const pointIds = new Float32Array(vertexCount);
  pointIds.forEach((_value, index) => {
    pointIds[index] = Number(index.toFixed(1));
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(pointIds, 1));
};
const setRandomValues = (attributeId, vertexCount, bufferGeometry) => {
  const angles = new Float32Array(vertexCount);
  angles.forEach((_value, index) => {
    angles[index] = Math.random();
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(angles, 1));
};

const setRandomizedPercentage = (
  attributeId,
  vertexCount,
  bufferGeometry,
  valueConfig
) => {
  const { randomizedPercentage } = valueConfig ?? {
    randomizedPercentage: 0.5,
  };
  const randomBool = new Float32Array(vertexCount);
  randomBool.forEach((_value, index) => {
    randomBool[index] = Math.random() < randomizedPercentage ? 1.0 : 0.0;
  });
  bufferGeometry.setAttribute(attributeId, new BufferAttribute(randomBool, 1));
};
