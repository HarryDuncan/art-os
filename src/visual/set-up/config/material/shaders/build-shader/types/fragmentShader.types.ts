import {
  FRAGMENT_EFFECT,
  INTERACTION_FRAGMENT_EFFECT,
  TRIGGERED_FRAGMENT_EFFECT,
} from "../fragment-effects/fragmentEffects.consts";
import {
  EffectParameters,
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
  AttributeConfig,
} from "./buildShader.types";

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

// <------------------------------------Interactive ------------------------------------->
export type InteractiveFragmentEffectProps = PointColorEffectProps;
export type InteractiveFragmentEffectType = keyof typeof INTERACTION_FRAGMENT_EFFECT;

export type InteractiveFragmentEffect = {
  effectType: InteractiveFragmentEffectType;
  effectProps: InteractiveFragmentEffectProps;
};

// <----------------------------------------TRIGGERED -------------------------------------->

export type TriggeredFragmentEffectProps =
  | PointColorEffectProps
  | OpacityEffectProps;
export type TriggeredFragmentEffectType = keyof typeof TRIGGERED_FRAGMENT_EFFECT;
export type TriggeredFragmentEffect = {
  effectType: TriggeredFragmentEffectType;
  effectProps: TriggeredFragmentEffectProps;
};
