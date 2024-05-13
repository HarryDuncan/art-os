import { DEFAULT_VERTEX_EFFECT } from "../../../buildShader.consts";
import { ImageVertexEffect } from "../../../buildShader.types";
import { VERTEX_EFFECTS } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { imageToPoints } from "./sub-effects/image-to-points/imageToPoints";

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
    case VERTEX_EFFECTS.IMAGE_TO_POINT:
      return imageToPoints(pointName, effectProps);
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
