import { ShaderPropertyValueTypes } from "../../../../constants";
import { UniformConfig } from "../../../../types";

export const PHYSICAL_MATERIAL_UNIFORM_CONFIG = {
  defaultUniforms: ["uResolution"],
  customUniforms: [
    { id: "uRoughness", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uMetalness", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uOpacity", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uIor", valueType: ShaderPropertyValueTypes.FLOAT },
    { id: "uDiffuse", valueType: ShaderPropertyValueTypes.VEC3 },
    { id: "uEmissive", valueType: ShaderPropertyValueTypes.VEC3 },
    { id: "uSpecularColor", valueType: ShaderPropertyValueTypes.VEC3 },
    { id: "uAmbientLightColor", valueType: ShaderPropertyValueTypes.VEC3 },
  ],
} as UniformConfig;

export const DEFAULT_PHYSICAL_MATERIAL_EFFECT_PROPS = {};
