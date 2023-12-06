import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../buildShader.constants";
import { ShaderPropertyConfig } from "../buildShader.types";
import { createDeclarationString } from "./createDeclarationString";

export const setUpCustomPropertyValues = (
  config: ShaderPropertyConfig[],
  propertyType: ShaderPropertyTypes
) => {
  const customProperties = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType }) => {
    switch (valueType) {
      case ShaderPropertyValueTypes.INT:
        customProperties[id] = { value: value ?? 0 };
        break;
      case ShaderPropertyValueTypes.FLOAT:
        customProperties[id] = { value: value ?? 0 };
        break;
      case ShaderPropertyValueTypes.BOOL:
        customProperties[id] = { value: value ?? false };
        break;
      case ShaderPropertyValueTypes.VEC2:
        customProperties[id] = { value: value ?? new Vector2() };
        break;
      case ShaderPropertyValueTypes.VEC3:
        customProperties[id] = { value: value ?? new Vector3() };
        break;
      case ShaderPropertyValueTypes.VEC4:
        customProperties[id] = { value: value ?? new Vector4() };
        break;
      case ShaderPropertyValueTypes.MAT2:
        customProperties[id] = { value: value ?? new Matrix3() };
        break;
      case ShaderPropertyValueTypes.MAT3:
        customProperties[id] = { value: value ?? new Matrix3() };
        break;
      case ShaderPropertyValueTypes.MAT4:
        customProperties[id] = { value: value ?? new Matrix4() };
        break;
      case ShaderPropertyValueTypes.SAMPLER2D:
        customProperties[id] = { value: value ?? null };
        break;
      case ShaderPropertyValueTypes.SAMPLER_CUBE:
        customProperties[id] = { value: value ?? null };
        break;
      case ShaderPropertyValueTypes.VOID:
        break;
      case ShaderPropertyValueTypes.CONST:
        break;
      default:
        console.warn(`uniform configuration not set for ${valueType}`);
    }
    customStrings.push(createDeclarationString(propertyType, valueType, id));
  });
  return { customProperties, customStrings };
};
