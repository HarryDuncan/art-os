import { ShaderFunction, VaryingConfig } from "../../../../buildShader.types";
import { noise3D } from "../../../../shader-properties/functions/noise/noise3d";

export const NOISE_EFFECT_TYPES = {
  PERLIN: "PERLIN",
  NORMAL: "NORMAL",
};
export const NOISE_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [{ id: "uNoiseStrength", valueType: "FLOAT", value: 1.0 }],
};

export const NOISE_VARYINGS = [
  { id: "vPointId", valueType: "FLOAT", varyingType: "ATTRIBUTE" },
] as VaryingConfig[];

export const DEFAULT_NOISE_PARAMETERS = {
  noiseType: NOISE_EFFECT_TYPES.NORMAL,
  effectStrength: 1.0,
};

export const NOISE_FUNCTIONS = [{ id: "noise", functionDefinition: noise3D }];
