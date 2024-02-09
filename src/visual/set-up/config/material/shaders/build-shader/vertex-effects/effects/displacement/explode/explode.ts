import { UniformConfig, VaryingConfig } from "../../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { explodeTransformation } from "./explodeTransformation";

export const explodeFunctions = () => [];

export const explodeUniforms = () => ({
  defaultUniforms: ["uPosition"],
  customUniforms: [{ id: "uPower", valueType: "FLOAT", value: 1.5 }],
});

export const explodeVaryings = () =>
  [
    { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
  ] as VaryingConfig[];

export const explode = (transformPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.EXPLODED_POINT;
  const uniformConfig = explodeUniforms() as UniformConfig;
  const varyingConfig = explodeVaryings();
  const transformation = explodeTransformation(transformPointName, pointName);
  const requiredFunctions = explodeFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
