import { Vector2, Vector3 } from "three";
import { EMPTY_UNIFORM_CONFIG } from "./shader-properties/uniforms/uniforms.consts";

export enum ShaderPropertyValueTypes {
  INT = "INT",
  FLOAT = "FLOAT",
  BOOL = "BOOL",
  VEC2 = "VEC2",
  VEC3 = "VEC3",
  VEC4 = "VEC4",
  MAT2 = "MAT2",
  MAT3 = "MAT3",
  MAT4 = "MAT4",
  SAMPLER2D = "SAMPLER2D",
  SAMPLER_CUBE = "SAMPLER_CUBE",
  VOID = "VOID",
  CONST = "CONST",
}

export enum ShaderPropertyTypes {
  UNIFORM = "UNIFORM",
  VARYING = "VARYING",
  ATTRIBUTE = "ATTRIBUTE",
}

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
  uCenter: {
    valueType: ShaderPropertyValueTypes.VEC3,
    defaultValue: new Vector3(0, 0, 0),
  },
  uIsTriggered: {
    valueType: ShaderPropertyValueTypes.FLOAT,
    defaultValue: 0.0,
  },
};

export const DEFAULT_VARYINGS = {};

export const DISPLACEMENT_TYPES = {
  EXPLODE: "EXPLODE",
  IMPLODE: "IMPLODE",
};

export const MAIN_START = "void main() {";
export const MAIN_END = "}";
export const TRIGGERED_VERTEX_EFFECT = {
  DISPLACE: "DISPLACE",
  WARP: "WARP",
};
export const TRIGGERED_FRAGMENT_EFFECT = {
  COLOR: "COLOR",
  OPACITY: "OPACITY",
  EMPTY: "EMPTY",
};

export const INTERACTION_VERTEX_EFFECT = {
  DISPLACE: "DISPLACE",
  WARP: "WARP",
};

export const INTERACTION_FRAGMENT_EFFECT = {
  COLOR: "COLOR",
};

export const POINT_PARENTS = {
  INTERACTIVE: "INTERACTIVE",
  TRIGGERED: "TRIGGERED",
};
export const DEFAULT_VERTEX_EFFECT = {
  requiredFunctions: [],
  uniformConfig: EMPTY_UNIFORM_CONFIG,
  transformation: "",
  varyingConfig: [],
  attributeConfig: [],
  pointName: "",
};
