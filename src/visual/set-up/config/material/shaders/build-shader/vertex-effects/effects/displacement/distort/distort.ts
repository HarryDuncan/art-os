import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { distortTransform } from "./distortTransform";
import {
  DEFAULT_DISTORT_FUNCTION,
  DEFAULT_DISTORT_UNIFORMS,
  DEFAULT_DISTORT_VARYING,
} from "./distort.consts";

export const distort = (previousPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.DISTORT_POINT;
  const uniformConfig = DEFAULT_DISTORT_UNIFORMS;
  const varyingConfig = DEFAULT_DISTORT_VARYING;
  const { transform } = distortTransform(previousPointName, pointName);
  const requiredFunctions = DEFAULT_DISTORT_FUNCTION;
  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation: transform,
    varyingConfig,
    pointName,
  };
};
