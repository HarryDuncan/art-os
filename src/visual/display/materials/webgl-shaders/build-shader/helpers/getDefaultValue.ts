import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import { PROPERTY_VALUE_TYPES } from "../buildShader.constants";
import { PropertyValueType } from "../buildShader.types";

export const getDefaultValue = (valueType: PropertyValueType) => {
  switch (valueType) {
    case PROPERTY_VALUE_TYPES.FLOAT:
      return 0.0;
    case PROPERTY_VALUE_TYPES.INT:
      return 0;
    case PROPERTY_VALUE_TYPES.BOOL:
      return false;
    case PROPERTY_VALUE_TYPES.VEC2:
      return new Vector2(0, 0);
    case PROPERTY_VALUE_TYPES.VEC3:
      return new Vector3(0, 0, 0);
    case PROPERTY_VALUE_TYPES.VEC4:
      return new Vector4(0, 0, 0, 0);
    case PROPERTY_VALUE_TYPES.MAT2:
      return null;
    case PROPERTY_VALUE_TYPES.MAT3:
      return new Matrix3();
    case PROPERTY_VALUE_TYPES.MAT4:
      return new Matrix4();
    case PROPERTY_VALUE_TYPES.SAMPLER_2D:
      return null;
    case PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
      return null;
    default:
      return null; // Handle unsupported types or VOID type here
  }
};

export const getDefaultValueAsString = (
  valueType: PropertyValueType
): string => {
  switch (valueType) {
    case PROPERTY_VALUE_TYPES.FLOAT:
      return `0.0`;
    case PROPERTY_VALUE_TYPES.INT:
      return `0`;
    case PROPERTY_VALUE_TYPES.BOOL:
      return `false`;
    case PROPERTY_VALUE_TYPES.VEC2:
      return `vec2(0.0, 0.0)`;
    case PROPERTY_VALUE_TYPES.VEC3:
      return `vec3(0.0, 0.0, 0.0)`;
    case PROPERTY_VALUE_TYPES.VEC4:
      return `vec4(0.0, 0.0, 0.0, 0.0)`;
    case PROPERTY_VALUE_TYPES.MAT2:
      return `mat2(1.0, 0.0, 0.0, 1.0)`;
    case PROPERTY_VALUE_TYPES.MAT3:
      return `mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)`;
    case PROPERTY_VALUE_TYPES.MAT4:
      return `mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)`;
    case PROPERTY_VALUE_TYPES.SAMPLER_2D:
      return `sampler2D`;
    case PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
      return `samplerCube`;
    default:
      return ``; // Handle unsupported types or VOID type here
  }
};
