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
  uOpacity: {
    valueType: ShaderPropertyValueTypes.FLOAT,
    defaultValue: 1.0,
  },
  uProgress: {
    valueType: ShaderPropertyValueTypes.FLOAT,
    defaultValue: 0.0,
  },
  uStrength: {
    valueType: ShaderPropertyValueTypes.FLOAT,
    defaultValue: 8.0,
  },
  uLoopCount: {
    valueType: ShaderPropertyValueTypes.INT,
    defaultValue: 0,
  },
};

export const UNIFORM_DECLARATION = "// UNIFORM DECLARATION";

export const EMPTY_UNIFORM_CONFIG = {
  defaultUniforms: [],
  customUniforms: [],
};
