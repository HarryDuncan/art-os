import { ShaderParameterConfig } from "../buildShader.types";
import { VARYING_TYPES } from "./varyings.consts";

export type VaryingTypes = keyof typeof VARYING_TYPES;

export type VaryingConfig = ShaderParameterConfig & {
  varyingType: VaryingTypes;
  attributeKey?: string;
};
