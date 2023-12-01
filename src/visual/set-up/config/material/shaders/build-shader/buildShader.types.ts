import {
  DISPLACEMENT_TYPES,
  PROPERTY_TYPES,
  PROPERTY_VALUE_TYPES,
} from "./buildShader.constants";
import { FRAGMENT_EFFECT } from "./fragment-effects/fragmentEffects.consts";
import { DEFAULT_UNIFORMS } from "./shader-properties/uniforms/uniforms.consts";

export type PropertyValueType = keyof typeof PROPERTY_VALUE_TYPES;
export type PropertyType = keyof typeof PROPERTY_TYPES;

export type VertexEffectType = unknown;
export type DisplacementType = keyof typeof DISPLACEMENT_TYPES;

export type ShaderPropertyConfig = {
  id: string;
  valueType: PropertyValueType;
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
  varyingConfig;
  transformation;
  fragmentColorName: string;
}

export type AttributeConfig = ShaderPropertyConfig;

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type ShaderValueType = keyof typeof PROPERTY_VALUE_TYPES;
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
