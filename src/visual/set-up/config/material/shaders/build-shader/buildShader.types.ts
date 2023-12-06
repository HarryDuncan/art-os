import { Axis } from "visual/utils/three-dimension-space/position/position.types";
import {
  DISPLACEMENT_TYPES,
  ShaderPropertyValueTypes,
} from "./buildShader.constants";
import { FRAGMENT_EFFECT } from "./fragment-effects/fragmentEffects.consts";
import { DEFAULT_UNIFORMS } from "./shader-properties/uniforms/uniforms.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";

// GENERAL TYPES

// <--------------------- VERTEX ---------------------------->
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

export type RotationEffectProps = {
  speed: number;
  axis: Axis;
};

export type MorphEffectProps = {};
export type VertexEffectProps =
  | RotationEffectProps
  | DisplacementEffectProps
  | MorphEffectProps;

export type VertexEffectConfig = {
  effectType: DisplacementType;
  effectProps: VertexEffectProps;
};

// <--------------------------- FRAGMENT -------------------------------->
export type FragmentEffectType = keyof typeof FRAGMENT_EFFECT;
export type PointDefinition = {
  id: string;
  pointColor: string;
};
export type PointMaterialEffectProps = {
  pointDisplayPercentage: number;
  pointDefinitions: PointDefinition[];
};
export type FragmentEffectProps = PointMaterialEffectProps;
export type FragmentEffectConfig = {
  effectType: FragmentEffectType;
  effectProps?: FragmentEffectProps;
};

export interface FragmentEffectData {
  requiredFunctions: ShaderFunction[];
  uniformConfig: UniformConfig;
  varyingConfig: VaryingConfig[];
  attributeConfig: AttributeConfig[];
  transformation: string;
  fragmentColorName: string;
}

// <---------------------------------------- VARYING ------------------------>
export type VaryingTypes = keyof typeof VARYING_TYPES;

export type VaryingConfig = ShaderPropertyConfig & {
  varyingType: VaryingTypes;
  attributeKey?: string;
};

// <------------------------------------ ATTRIBUTES ------------------------------>
export type RandomBoolConfig = {
  randomizedPercentage: number;
};
export type ShaderAttributeConfig = {
  attributeConfigs: AttributeConfig[];
  materialId: string;
};
export type AttributeValueConfig = RandomBoolConfig;
export type AttributeConfig = ShaderPropertyConfig & {
  valueConfig?: AttributeValueConfig;
};

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

// <-------------------------------------UNIFORMS ---------------------------------->

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;

export type UniformValueConfig = ShaderPropertyConfig;
export type UniformConfig = {
  defaultUniforms: DefaultUniform[];
  customUniforms?: UniformValueConfig[];
};

export type BuiltShaderConfig = {
  vertexEffectConfigs: VertexEffectConfig[];
  fragmentEffectConfigs: FragmentEffectConfig[];
  uniformConfig?: UniformConfig;
  varyingConfig?: VaryingConfig[];
  attributeConfig?: AttributeConfig[];
};
