import { ShaderPropertyValueTypes } from "../../../../constants";
import { matcapFunction } from "../../../../shader-properties/functions/matcapFunctions";
import { calculateNormal } from "../../../../shader-properties/functions/maths/maths";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import { DefaultUniform, VaryingConfig } from "../../../../types";

export const DEFAULT_MATCAP_UNIFORMS = {
  defaultUniforms: ["uMaterial", "uResolution"] as DefaultUniform[],
  customUniforms: [
    {
      id: "uLightDir",
      valueType: ShaderPropertyValueTypes.VEC2,
    },
  ],
};

export const DEFAULT_MATCAP_EFFECT_PROPS = {
  opacity: 1.0,
};

export const MATCAP_REQUIRED_FUNCTIONS = [
  { id: "calculateNormal", functionDefinition: calculateNormal },
  { id: "matcap", functionDefinition: matcapFunction },
];
export const MATCAP_VARYINGS = [
  {
    id: "vEye",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
  {
    id: "vPosition",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
  {
    id: "vNormal",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
  {
    id: "vUv",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC2,
  },
] as VaryingConfig[];
