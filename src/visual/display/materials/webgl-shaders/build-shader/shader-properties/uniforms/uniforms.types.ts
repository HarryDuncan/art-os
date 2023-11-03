import { PROPERTY_VALUE_TYPES } from "../../buildShader.constants";
import { ShaderPropertyConfig } from "../../buildShader.types";
import { DEFAULT_UNIFORMS } from "./uniforms.consts";

export type DefaultUniform = keyof typeof DEFAULT_UNIFORMS;
export type ShaderValueType = keyof typeof PROPERTY_VALUE_TYPES;

export type UniformValueConfig = ShaderPropertyConfig & {};

export type UniformConfig = {
  defaultUniforms: DefaultUniform[];
  customUniforms?: UniformValueConfig[];
};
