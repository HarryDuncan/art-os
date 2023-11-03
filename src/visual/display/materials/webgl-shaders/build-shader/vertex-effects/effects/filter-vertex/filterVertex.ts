import { UniformConfig } from "../../../shader-properties/uniforms/uniforms.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../vertexEffects.consts";
import { VertexEffectData } from "../../vertexEffects.types";
import { vertexFilterTransformation } from "./vertexFilterTransformation";

export const vertexFilterFunctions = () => [];

export const vertexFilterUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [{ id: "uReduced", valueType: "FLOAT", value: 5.0 }],
});

export const vertexFilterVaryings = () => [];

export const vertexFilter = (transformPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.FILTERED_POINT;
  const uniformConfig = vertexFilterUniforms() as UniformConfig;
  const varyingConfig = vertexFilterVaryings();
  const transformation = vertexFilterTransformation(
    transformPointName,
    pointName
  );
  const requiredFunctions = vertexFilterFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
