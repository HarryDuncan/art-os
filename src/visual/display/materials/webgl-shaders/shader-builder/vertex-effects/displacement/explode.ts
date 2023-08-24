export const explodeFunctions = () => {};

export const explodeTransformation = () => {
  return ``;
};

export const explodeUniforms = () => {};

export const explodeVaryings = () => {};
const EXPLODED_POINT = "explodedPoint";

export const explode = (transformPointName: string) => {
  const uniforms = explodeUniforms();
  const varyings = explodeVaryings();
  const transformation = explodeTransformation();
  return { uniforms, transformation, varyings, pointName: EXPLODED_POINT };
};
