import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import { PROPERTY_VALUE_TYPES } from "../buildShader.constants";
import { PropertyType, ShaderPropertyConfig } from "../buildShader.types";
import { createDeclarationString } from "./createDeclarationString";

export const setUpCustomPropertyValues = (
  config: ShaderPropertyConfig[],
  propertyType: PropertyType
) => {
  const customProperties = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType }) => {
    switch (valueType) {
      case PROPERTY_VALUE_TYPES.INT:
        customProperties[id] = { value: value ?? 0 };
        break;
      case PROPERTY_VALUE_TYPES.FLOAT:
        customProperties[id] = { value: value ?? 0 };
        break;
      case PROPERTY_VALUE_TYPES.BOOL:
        customProperties[id] = { value: value ?? false };
        break;
      case PROPERTY_VALUE_TYPES.VEC2:
        customProperties[id] = { value: value ?? new Vector2() };
        break;
      case PROPERTY_VALUE_TYPES.VEC3:
        customProperties[id] = { value: value ?? new Vector3() };
        break;
      case PROPERTY_VALUE_TYPES.VEC4:
        customProperties[id] = { value: value ?? new Vector4() };
        break;
      case PROPERTY_VALUE_TYPES.MAT2:
        customProperties[id] = { value: value ?? new Matrix3() };
        break;
      case PROPERTY_VALUE_TYPES.MAT3:
        customProperties[id] = { value: value ?? new Matrix3() };
        break;
      case PROPERTY_VALUE_TYPES.MAT4:
        customProperties[id] = { value: value ?? new Matrix4() };
        break;
      case PROPERTY_VALUE_TYPES.SAMPLER_2D:
        customProperties[id] = { value: value ?? null };
        break;
      case PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
        customProperties[id] = { value: value ?? null };
        break;
      case PROPERTY_VALUE_TYPES.VOID:
        break;
      case PROPERTY_VALUE_TYPES.CONST:
        break;
      default:
        console.warn(`uniform configuration not set for ${valueType}`);
    }
    customStrings.push(createDeclarationString(propertyType, valueType, id));
  });
  return { customProperties, customStrings };
};
