import { BufferAttribute, BufferGeometry } from "three";

export type RandomBoolConfig = {
  randomizedPercentage: number;
};
export type ValueConfig = RandomBoolConfig;
export type AttributeConfig = {
  id: string;
  valueType: string;
  value?: unknown;
  valueConfig?: ValueConfig;
};
export const setAttribute = (
  bufferGeometry: BufferGeometry,
  vertexCount: number,
  attributeConfig: AttributeConfig[]
) => {
  attributeConfig.forEach(({ id, valueConfig }) => {
    if (id.indexOf("randomAngle")) {
      const angles = new Float32Array(vertexCount);
      angles.forEach((_value, index) => {
        angles[index] = Math.random();
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(angles, 1));
    }
    if (id.indexOf("pointIndex")) {
      const pointIds = new Float32Array(vertexCount);
      pointIds.forEach((_value, index) => {
        pointIds[index] = Number(index.toFixed(1));
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(pointIds, 1));
    }

    if (id.indexOf("randomBool")) {
      const { randomizedPercentage } = valueConfig ?? {
        randomizedPercentage: 0.5,
      };
      const randomBool = new Float32Array(vertexCount);
      randomBool.forEach((_value, index) => {
        randomBool[index] = Math.random() < randomizedPercentage ? 1.0 : 0.0;
      });
      bufferGeometry.setAttribute(id, new BufferAttribute(randomBool, 1));
    }
  });
};
