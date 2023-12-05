import { Vector2, Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../buildShader.constants";

export const DEFAULT_UNIFORMS = {
  uPosition: {
    valueType: ShaderPropertyValueTypes.VEC3,
    defaultValue: new Vector3(0, 0, 0),
  },
  uResolution: {
    valueType: ShaderPropertyValueTypes.VEC2,
    defaultValue: new Vector2(0, 0),
  },
  uMaterial: {
    valueType: ShaderPropertyValueTypes.SAMPLER2D,
    defaultValue: null,
  },
};

export const UNIFORM_DECLARATION = "// UNIFORM DECLARATION";

export const EMPTY_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
