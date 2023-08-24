import { SHADER_VALUE_TYPES } from "../buildShader.constants";
import { ShaderParameterConfig } from "../buildShader.types";
import { DEFAULT_UNIFORMS } from "./uniforms.consts";

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type ShaderValueType = keyof typeof SHADER_VALUE_TYPES;

export type UniformConfig = ShaderParameterConfig & {};

export type UniformSchema = {
  defaults: DefaultUniform[];
  custom?: UniformConfig[];
};
