import { DISPLACEMENT_TYPES } from "./buildShader.constants";
import { ShaderValueType } from "./uniforms/uniforms.types";

export type VertexEffectType = any;
export type DisplacementType = keyof typeof DISPLACEMENT_TYPES;

export type ShaderParameterConfig = {
  name: string;
  type: ShaderValueType;
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

export type VertexEffect = {
  effectType: DisplacementType;
  effectProps: DisplacementEffectProps;
};

export type VertexEffectConfig = VertexEffect;

export type AttributeConfig = {
  name: string;
  type: ShaderValueType;
};
