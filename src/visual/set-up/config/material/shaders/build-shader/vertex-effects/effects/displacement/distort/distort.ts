import { twister } from "visual/display/materials/webgl-shaders/shader-functions/noise/distortion/distortion";
import { UniformConfig, VaryingConfig } from "../../../../buildShader.types";
import { VERTEX_EFFECT_POINT_NAMES } from "../../../vertexEffects.consts";
import { VertexEffectData } from "../../../vertexEffects.types";
import { distortTransform } from "./distortTransform";

export const distortFunctions = () => [
  { id: "twister", functionDefinition: twister },
];

export const distortUniforms = () => ({
  defaultUniforms: ["uStrength"],
  customUniforms: [{ id: "uAngle", valueType: "FLOAT", value: 1.5 }],
});

export const distortVaryings = () =>
  [
    { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
    {
      id: "vNormal",
      valueType: "VEC3",
      varyingType: "CUSTOM",
      value: "twistedNormal.xyz",
    },
  ] as VaryingConfig[];

export const distort = (previousPointName: string): VertexEffectData => {
  const pointName = VERTEX_EFFECT_POINT_NAMES.DISTORT_POINT;
  const uniformConfig = distortUniforms() as UniformConfig;
  const varyingConfig = distortVaryings() as VaryingConfig[];
  const transformation = distortTransform(previousPointName, pointName);
  const requiredFunctions = distortFunctions();
  return {
    attributeConfig: [],
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
