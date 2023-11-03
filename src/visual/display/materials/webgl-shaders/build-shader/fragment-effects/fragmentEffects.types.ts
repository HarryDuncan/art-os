import { ShaderFunction } from "../buildShader.types";
import { UniformConfig } from "./../shader-properties/uniforms/uniforms.types";
import { FRAGMENT_EFFECT } from "./fragmentEffects.consts";

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
