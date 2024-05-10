import {
  Axis,
  Position3d,
} from "visual/utils/three-dimension-space/position/position.types";
import {
  DEFAULT_UNIFORMS,
  DISPLACEMENT_TYPES,
  INTERACTION_FRAGMENT_EFFECT,
  INTERACTION_VERTEX_EFFECT,
  POINT_PARENTS,
  ShaderPropertyValueTypes,
  TRIGGERED_FRAGMENT_EFFECT,
  TRIGGERED_VERTEX_EFFECT,
} from "./buildShader.consts";
import { FRAGMENT_EFFECT } from "./fragment-effects/fragmentEffects.consts";
import { VARYING_TYPES } from "./shader-properties/varyings/varyings.consts";
import { TransformTypes } from "./vertex-effects/vertexEffects.consts";
import { NOISE_EFFECT_TYPES } from "./vertex-effects/effects/displacement/noise/noise.consts";

// GENERAL TYPES
export type ShaderFunction = {
  id: string;
  functionDefinition: string;
};

export type EffectParameters = {
  declareInTransform?: boolean;
  pointParent?: PointParent;
};

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
export type PointParent = keyof typeof POINT_PARENTS;

export type ExplodeEffectProps = EffectParameters & {
  effectDistanceMinLength: number;
  effectStrength: number;
};

export type ExpandEffectProps = EffectParameters & {
  effectDistanceMinLength: number;
  effectStrength: number;
  maxEffectStrength: number;
  multiplier: number;
};

export type NoiseEffectTypes = keyof typeof NOISE_EFFECT_TYPES;
export type NoiseEffectProps = EffectParameters & {
  noiseType: NoiseEffectTypes;
  effectStrength: number;
};
export type RotationEffectProps = EffectParameters & {
  speed: number;
  axis: Axis;
};

export type MorphEffectProps = {
  morphCount: number;
  preTransformConfigs: PreTransformConfig[];
};

export type PointPerspectiveConfig = {
  floor: number;
  ceiling: number;
  scaleFactor: number;
  divisor: number;
};

export type PointsEffectProps = {
  pointSize: number;
  perspectiveConfig: PointPerspectiveConfig;
};

// <----------------------Triggered ----------------------------------------->
export type TriggeredVertexEffectProps =
  | DisplacementEffectProps
  | ExplodeEffectProps
  | ExpandEffectProps;

export type TriggeredVertexEffectType = keyof typeof TRIGGERED_VERTEX_EFFECT;
export type TriggeredVertexEffect = {
  effectType: TriggeredVertexEffect;
  effectProps: TriggeredVertexEffectProps;
};

export type TriggeredFragmentEffectProps =
  | PointColorEffectProps
  | OpacityEffectProps;
export type TriggeredFragmentEffectType =
  keyof typeof TRIGGERED_FRAGMENT_EFFECT;
export type TriggeredFragmentEffect = {
  effectType: TriggeredFragmentEffectType;
  effectProps: TriggeredFragmentEffectProps;
};

export type TriggeredEffectProps =
  | TriggeredFragmentEffect
  | TriggeredVertexEffect;

// <--------------------- Interactive ---------------------------------------->
export type InteractiveVertexEffectProps =
  | DisplacementEffectProps
  | ExplodeEffectProps;
export type InteractiveVertexEffectType =
  keyof typeof INTERACTION_VERTEX_EFFECT;

export type InteractiveVertexEffect = {
  effectType: InteractiveVertexEffect;
  effectProps: InteractiveVertexEffectProps;
};

export type InteractiveFragmentEffectProps = PointColorEffectProps;
export type InteractiveFragmentEffectType =
  keyof typeof INTERACTION_FRAGMENT_EFFECT;

export type InteractiveFragmentEffect = {
  effectType: InteractiveFragmentEffectType;
  effectProps: InteractiveFragmentEffectProps;
};

export type InteractiveEffectProps =
  | InteractiveFragmentEffect
  | InteractiveVertexEffect;

export type VertexEffectProps =
  | RotationEffectProps
  | DisplacementEffectProps
  | MorphEffectProps
  | PointsEffectProps
  | InteractiveEffectProps
  | ExpandEffectProps
  | NoiseEffectProps
  | ExplodeEffectProps;

export type VertexEffectConfig = {
  effectType: DisplacementType;
  effectProps: VertexEffectProps;
};

// PRE-TRANSFORMS

export type TranslateTransformProps = {
  translate: Partial<Position3d>;
};
export type TransformProps = TranslateTransformProps;
export type PreTransformConfig = {
  index: number;
  pointName: string;
  transformType: TransformTypes;
  transformProps: TransformProps;
};
export type PreTransformData = {
  index: number;
  transform: string;
  positionName: string;
  normalName: string;
  requiredFunctions: ShaderFunction[];
};

// <--------------------------- FRAGMENT -------------------------------->
export type FragmentEffectType = keyof typeof FRAGMENT_EFFECT;
export type PointDefinition = {
  id: string;
  pointColor: string;
};
export type PointColorEffectProps = EffectParameters & {
  pointColor: string;
};
export type PointMaterialEffectProps = EffectParameters & {
  pointDisplayPercentage: number;
  defaultColor?: string;
  pointDefinitions: PointDefinition[];
};

export type MaterialEffectProps = EffectParameters & {
  opacity?: number;
};

export type ColorEffectProps = EffectParameters & {
  color: string;
  opacity?: number;
};

export type VanishEffectProps = EffectParameters & {
  numberOfRings?: number;
  vanishHeight: number;
};
export type OpacityEffectProps = EffectParameters & {
  opacity: number;
  asUniform: boolean;
};

export type FragmentEffectProps =
  | PointMaterialEffectProps
  | ColorEffectProps
  | OpacityEffectProps
  | VanishEffectProps
  | TriggeredFragmentEffect
  | MaterialEffectProps
  | InteractiveFragmentEffect;

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
  fragName: string;
  fragmentColorInstantiation?: string;
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

// <-------------------------------------UNIFORMS ---------------------------------->

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type UniformObject = {
  [key: string]: { value: unknown };
};
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
