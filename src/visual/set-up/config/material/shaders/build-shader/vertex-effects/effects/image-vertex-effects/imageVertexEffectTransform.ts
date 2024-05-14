import { DEFAULT_VERTEX_EFFECT } from "../../../constants";
import { POINT_PARENTS } from "../../../constants/buildShader.consts";
import {
  ImageVertexEffect,
  ImageVertexEffectProps,
  PointParent,
} from "../../../types";
import { VERTEX_EFFECTS } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { imageToPoints } from "./sub-effects/image-to-points/imageToPoints";

export const imageVertexEffectTransform = (
  pointName: string,
  previousPointName: string,
  imageVertexEffectProps: ImageVertexEffect
) => {
  const { declareInTransform, effectProps } = imageVertexEffectProps;
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransform,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
  } = getEffectData(previousPointName, effectProps);

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
  imageVertexEffectProps: ImageVertexEffectProps
): VertexEffectData => {
  const { effectType } = imageVertexEffectProps;
  const formattedEffectProps = {
    ...imageVertexEffectProps,
    pointParent: POINT_PARENTS.IMAGE_EFFECT as PointParent,
  };
  console.log(formattedEffectProps);
  switch (effectType) {
    case VERTEX_EFFECTS.IMAGE_TO_POINT:
      return imageToPoints(pointName, formattedEffectProps);
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
