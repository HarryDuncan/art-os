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
export type PointTexture = {
  id: string;
  pointColor: string;
};
export type PointColorFragmentEffectProps = EffectParameters & {
  pointColor: string;
};
export type PointMaterialFragmentEffectProps = EffectParameters & {
  pointDisplayPercentage: number;
  defaultColor?: string;
  pointTextures: PointTexture[];
};

export type MaterialEffectProps = EffectParameters & {
  opacity?: number;
};

export type ColorFragmentEffectProps = EffectParameters & {
  color: string;
  opacity?: number;
};

export type VanishFragmentEffectProps = EffectParameters & {
  numberOfRings?: number;
  vanishHeight: number;
};
export type OpacityFragmentEffectProps = EffectParameters & {
  opacity: number;
  asUniform: boolean;
};

export type BrightnessFragmentEffectProps = EffectParameters & {};

export type FragmentEffectProps =
  | PointMaterialEffectProps
  | ColorFragmentEffectProps
  | OpacityFragmentEffectProps
  | VanishFragmentEffectProps
  | TriggeredFragmentEffect
  | MaterialEffectProps
  | InteractiveFragmentEffect
  | BrightnessFragmentEffectProps;

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
export type InteractiveFragmentEffectProps = PointColorFragmentEffectProps;
export type InteractiveFragmentEffectType = keyof typeof INTERACTION_FRAGMENT_EFFECT;

export type InteractiveFragmentEffect = {
  effectType: InteractiveFragmentEffectType;
  effectProps: InteractiveFragmentEffectProps;
};

// <----------------------------------------TRIGGERED -------------------------------------->

export type TriggeredFragmentEffectProps =
  | PointColorFragmentEffectProps
  | OpacityFragmentEffectProps;
export type TriggeredFragmentEffectType = keyof typeof TRIGGERED_FRAGMENT_EFFECT;
export type TriggeredFragmentEffect = {
  effectType: TriggeredFragmentEffectType;
  effectProps: TriggeredFragmentEffectProps;
};
