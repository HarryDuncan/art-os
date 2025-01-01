import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../../constants";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import { DefaultUniform, VaryingConfig } from "../../../../types";
import { UNIFORM_TAGS } from "../../../../shader-properties/uniforms/uniforms.consts";

export const DEFAULT_PHONG_UNIFORMS = {
  defaultUniforms: ["uMaterial", "uResolution"] as DefaultUniform[],
  customUniforms: [
    {
      id: "uLightPosition",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(5, 5, 5),
    },
    {
      id: "uDiffuseColor",
      tag: [UNIFORM_TAGS.COLOR],
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.2, 0.2, 0.2),
    },
    {
      id: "uLightColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(1, 1.0, 1.0),
    },
    {
      id: "uAmbientReflection",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.75,
    },
    {
      id: "uDiffuseReflection",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.9,
    },
    {
      id: "uSpecularReflection",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 0.7,
    },
    {
      id: "uAmbientColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.82, 0.92, 0.2),
    },
    {
      id: "uMaterialDiffuse",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0.5, 0.5, 0.5),
    },

    {
      id: "uSpecularColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(1.0, 1.0, 1.0),
    },
    {
      id: "uShininess",
      valueType: ShaderPropertyValueTypes.FLOAT,
      value: 20.3,
    },
  ],
};

export const DEFAULT_PHONG_EFFECT_PROPS = { DEFAULT_PHONG_UNIFORMS };

export const PHONG_REQUIRED_FUNCTIONS = [];
export const PHONG_VARYINGS = [
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
  {
    id: "vNormalInterpolation",
    varyingType: VARYING_TYPES.DEFAULT,
    valueType: ShaderPropertyValueTypes.VEC3,
  },
] as VaryingConfig[];
