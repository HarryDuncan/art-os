import { DEFAULT_VERTEX_EFFECT } from "../../../buildShader.consts";
import { ImageVertexEffect } from "../../../buildShader.types";
import { VertexEffectData } from "../../vertexEffects.types";

export const imageVertexEffectTransform = (
  pointName: string,
  previousPointName: string,
  imageVertexEffectProps: ImageVertexEffect
) => {
  const { declareInTransform } = imageVertexEffectProps;
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransform,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getEffectData(previousPointName, imageVertexEffectProps);

  const vertexPointInstantiation = `vec4 ${pointName} = vec4(${previousPointName}.xyz, 1.0);`;
  const transformation = `
  ${declareInTransform ? vertexPointInstantiation : ""}
  ${effectTransform}

`;
  return {
    transformation,
    effectUniforms,
    effectVaryings,
    effectPointName,
    effectFunctions,
    effectAttributes,
    vertexPointInstantiation,
  };
};

const getEffectData = (
  pointName: string,
  imageVertexEffectProps: ImageVertexEffect
): VertexEffectData => {
  const { effectType, effectProps } = imageVertexEffectProps;
  switch (effectType) {
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
