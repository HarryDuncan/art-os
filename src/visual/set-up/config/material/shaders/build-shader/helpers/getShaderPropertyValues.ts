import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../constants/buildShader.consts";
import { ShaderPropertyConfig } from "../types";
import { createDeclarationString } from "./createDeclarationString";

interface CustomProperties {
  [key: string]: { value: unknown } | { value: unknown }[];
}
export const setUpCustomPropertyValues = (
  config: ShaderPropertyConfig[],
  propertyType: ShaderPropertyTypes
) => {
  const customProperties: CustomProperties = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType, arrayLength }) => {
    if (arrayLength !== undefined) {
      const propertyValues = new Array(arrayLength).fill(
        getValue(valueType, value)
      );
      customProperties[id] = propertyValues;
    } else {
      const propertyValue = getValue(valueType, value);
      if (propertyValue) {
        customProperties[id] = propertyValue;
      } else {
        console.warn(`Property value for ${id} ${valueType} is undefined`);
      }
    }

    customStrings.push(
      createDeclarationString(propertyType, valueType, id, arrayLength)
    );
  });
  return { customProperties, customStrings };
};

const getValue = (valueType, value) => {
  switch (valueType) {
    case ShaderPropertyValueTypes.INT:
      return { value: value ?? 0 };
    case ShaderPropertyValueTypes.FLOAT:
      return { value: value ?? 0 };
    case ShaderPropertyValueTypes.BOOL:
      return { value: value ?? false };
    case ShaderPropertyValueTypes.VEC2:
      return { value: value ?? new Vector2() };
    case ShaderPropertyValueTypes.VEC3:
      return { value: value ?? new Vector3() };
    case ShaderPropertyValueTypes.VEC4:
      return { value: value ?? new Vector4() };
    case ShaderPropertyValueTypes.MAT2:
      return { value: value ?? new Matrix3() };
    case ShaderPropertyValueTypes.MAT3:
      return { value: value ?? new Matrix3() };
    case ShaderPropertyValueTypes.MAT4:
      return { value: value ?? new Matrix4() };
    case ShaderPropertyValueTypes.SAMPLER2D:
      return { value: value ?? null };
    case ShaderPropertyValueTypes.SAMPLER_CUBE:
      return { value: value ?? null };
    case ShaderPropertyValueTypes.VOID:
      break;
    case ShaderPropertyValueTypes.CONST:
      break;
    default:
      console.warn(`uniform configuration not set for ${valueType}`);
  }
};
