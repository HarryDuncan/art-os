import { DEFAULT_UNIFORMS } from "../../../../../buildShader.consts";
import { ImageToPointsEffectProps } from "../../../../../buildShader.types";

export const imageToPointsTransform = (
  pointName: string,
  previousPointName: string,
  imageVertexEffectProps: ImageToPointsEffectProps
) => {
  const { declareInTransform } = imageVertexEffectProps;
  const effectUniforms = DEFAULT_UNIFORMS;
  const effectVaryings = [];
  const effectFunctions = [];
  const effectAttributes = [];

  const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
  const transformation = `
  ${declareInTransform ? vertexPointInstantiation : ""}
  

`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,
    pointName,
    effectFunctions,
    effectAttributes,
    vertexPointInstantiation,
  };
};
