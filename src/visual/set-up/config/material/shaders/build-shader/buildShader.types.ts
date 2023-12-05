import {
  DISPLACEMENT_TYPES,
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "./buildShader.constants";
import { FRAGMENT_EFFECT } from "./fragment-effects/fragmentEffects.consts";
import { DEFAULT_UNIFORMS } from "./shader-properties/uniforms/uniforms.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";

export type PropertyType = keyof typeof ShaderPropertyTypes;

export type VertexEffectType = unknown;
export type DisplacementType = keyof typeof DISPLACEMENT_TYPES;

export type ShaderPropertyConfig = {
  id: string;
  valueType: ShaderPropertyValueTypes;
  value?: unknown;
};
export type DisplacementEffectProps = {
  props: {
    magnitude: {
      x: number;
      y: number;
      z: number;
    };
  };
};

export type VertexEffectConfig = {
  effectType: DisplacementType;
  effectProps: DisplacementEffectProps;
};

export type FragmentEffectType = keyof typeof FRAGMENT_EFFECT;
export type FragmentEffectConfig = {
  effectType: FragmentEffectType;
};

export interface FragmentEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  transformation: string;
  fragmentColorName: string;
}

export type VaryingTypes = keyof typeof VARYING_TYPES;

export type VaryingConfig = ShaderPropertyConfig & {
  varyingType: VaryingTypes;
  attributeKey?: string;
};

export type AttributeConfig = ShaderPropertyConfig;

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type ShaderValueType = keyof typeof ShaderPropertyValueTypes;
export type UniformValueConfig = ShaderPropertyConfig;
export type UniformConfig = {
  defaultUniforms: DefaultUniform[];
  customUniforms?: UniformValueConfig[];
};

export type BuiltShaderConfig = {
  vertexEffectConfigs: VertexEffectConfig[];
  fragmentEffectConfigs: FragmentEffectConfig[];
  uniformConfig?: UniformConfig;
  varyingConfig;
  attributeConfig;
};
