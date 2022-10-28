import { MathUtils, Texture, Vector2 } from "three";

export const getTextureRatio = (texture: Texture) => {
  const { height, width } = texture.image;
  const m = multiplyMatrixAndPoint(rotateMatrix(MathUtils.degToRad(0)), [
    width,
    height,
  ]);

  const originalRatio = {
    w: m[0] / width,
    h: m[1] / height,
  };

  const coverRatio = 1 / Math.max(originalRatio.w, originalRatio.h);

  return new Vector2(
    originalRatio.w * coverRatio,
    originalRatio.h * coverRatio
  );
};

const multiplyMatrixAndPoint = (matrix, point) => {
  const c0r0 = matrix[0];
  const c1r0 = matrix[1];
  const c0r1 = matrix[2];
  const c1r1 = matrix[3];
  const x = point[0];
  const y = point[1];
  return [Math.abs(x * c0r0 + y * c0r1), Math.abs(x * c1r0 + y * c1r1)];
};

const rotateMatrix = (a) => [
  Math.cos(a),
  -Math.sin(a),
  Math.sin(a),
  Math.cos(a),
];
