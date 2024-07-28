import { twisterDistortion } from "../../../../shader-properties/functions/distortion/distortion";
import { UniformConfig, VaryingConfig } from "../../../../types";

export const DEFAULT_DISTORT_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    { id: "uDistortAngle", valueType: "FLOAT", value: 1.5 },
    { id: "uDistortStrength", valueType: "FLOAT", value: 1.5 },
  ],
} as UniformConfig;

export const DEFAULT_DISTORT_VARYING = [
  { id: "vPosition", valueType: "VEC3", varyingType: "DEFAULT" },
  {
    id: "vNormal",
    valueType: "VEC3",
    varyingType: "CUSTOM",
    value: "twistedNormal.xyz",
  },
] as VaryingConfig[];

export const DEFAULT_DISTORT_FUNCTION = [
  { id: "twister", functionDefinition: twisterDistortion },
];
