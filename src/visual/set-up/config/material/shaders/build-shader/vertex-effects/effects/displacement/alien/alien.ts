import { twister } from "visual/display/materials/webgl-shaders/shader-functions/noise/distortion/distortion";
import { UniformConfig } from "../../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { alienTransform } from "./alienTransform";

export const distortFunctions = () => [
  { id: "twister", functionDefinition: twister },
];

export const distortUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [{ id: "uRadius", valueType: "FLOAT", value: 1.5 }],
});

export const distortVaryings = () => [
  { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
];

export const alienDistort = (transformPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.DISTORT_POINT;
  const uniformConfig = distortUniforms() as UniformConfig;
  const varyingConfig = distortVaryings();
  const transformation = alienTransform(transformPointName, pointName);
  const requiredFunctions = distortFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
