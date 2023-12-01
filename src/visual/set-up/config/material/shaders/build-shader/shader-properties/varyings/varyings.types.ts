import { ShaderPropertyConfig } from "../../buildShader.types";
import { VARYING_TYPES } from "./varyings.consts";

export type VaryingTypes = keyof typeof VARYING_TYPES;

export type VaryingConfig = ShaderPropertyConfig & {
  varyingType: VaryingTypes;
  attributeKey?: string;
};
