import {
  DISPLACEMENT_TYPES,
  PROPERTY_TYPES,
  PROPERTY_VALUE_TYPES,
} from "./buildShader.constants";
import { FragmentEffectConfig } from "./fragment-effects/fragmentEffects.types";
import { UniformConfig } from "./shader-properties/uniforms/uniforms.types";

export type PropertyValueType = keyof typeof PROPERTY_VALUE_TYPES;
export type PropertyType = keyof typeof PROPERTY_TYPES;

export type VertexEffectType = any;
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

export type AttributeConfig = ShaderPropertyConfig;

export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export type BuiltShaderConfig = {
  vertexEffectConfigs: VertexEffectConfig[];
  fragmentEffectConfigs: FragmentEffectConfig[];
  uniformConfig?: UniformConfig;
  varyingConfig;
  attributeConfig;
};
