import { AXIS } from "visual/utils/three-dimension-space/position/position.types";
import { ShaderPropertyValueTypes } from "../../../buildShader.consts";

export const ROTATION_UNIFORMS = {
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uRotationSpeed",
      valueType: ShaderPropertyValueTypes.FLOAT,
    },
  ],
};
export const ROTATION_FUNCTIONS = [];
export const ROTATION_VARYINGS = [];
export const ROTATION_ATTRIBUTES = [];

export const DEFAULT_ROTATION_EFFECT_CONFIG = {
  axis: AXIS.Y,
  speed: 0.2,
};
