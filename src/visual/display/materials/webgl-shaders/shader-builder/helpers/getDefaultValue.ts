import { Vector2, Vector3, Vector4 } from "three";
import { SHADER_VALUE_TYPES } from "../buildShader.constants";
import { ShaderValueType } from "../uniforms/uniforms.types";

export const getDefaultValue = (valueType: ShaderValueType) => {
  switch (valueType) {
    case SHADER_VALUE_TYPES.FLOAT:
      return 0.0;
    case SHADER_VALUE_TYPES.VEC2:
      return new Vector2(0, 0);
    case SHADER_VALUE_TYPES.VEC3:
      return new Vector3(0, 0, 0);
    case SHADER_VALUE_TYPES.VEC4:
      return new Vector4(0, 0, 0, 0);
  }
};

export const getDefaultValueAsString = (valueType: ShaderValueType) => {
  switch (valueType) {
    case SHADER_VALUE_TYPES.FLOAT:
      return `0.0`;
    case SHADER_VALUE_TYPES.VEC2:
      return `vec2(0.0, 0.0)`;
    case SHADER_VALUE_TYPES.VEC3:
      return `vec3(0.0, 0.0, 0.0)`;
    case SHADER_VALUE_TYPES.VEC4:
      return `(0, 0, 0, 0)`;
  }
};
