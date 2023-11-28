import { Matrix3, Matrix4, Vector2, Vector3, Vector4 } from "three";
import {
  PROPERTY_TYPES,
  PROPERTY_VALUE_TYPES,
} from "../../../buildShader.constants";
import { createDeclarationString } from "../../../helpers/createDeclarationString";
import {
  PropertyType,
  PropertyValueType,
  UniformValueConfig,
} from "../../../buildShader.types";

export const setUpCustom = (config: UniformValueConfig[] = []) => {
  const customUniforms = {};
  const customStrings: string[] = [];
  config.forEach(({ value, id, valueType }) => {
    switch (valueType) {
      case PROPERTY_VALUE_TYPES.INT:
        customUniforms[id] = { value: value ?? 0 };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.FLOAT:
        customUniforms[id] = { value: value ?? 0 };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.BOOL:
        customUniforms[id] = { value: value ?? false };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.VEC2:
        customUniforms[id] = { value: value ?? new Vector2() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.VEC3:
        customUniforms[id] = { value: value ?? new Vector3() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.VEC4:
        customUniforms[id] = { value: value ?? new Vector4() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.MAT2:
        // customUniforms[id] = { value: value ?? new Matrix2() };
        console.warn("mat 2 not configured");
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.MAT3:
        customUniforms[id] = { value: value ?? new Matrix3() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.MAT4:
        customUniforms[id] = { value: value ?? new Matrix4() };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.SAMPLER_2D:
        customUniforms[id] = { value: value ?? null };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
        customUniforms[id] = { value: value ?? null };
        customStrings.push(addUniformString(id, valueType));
        break;
      case PROPERTY_VALUE_TYPES.VOID:
        break;
      case PROPERTY_VALUE_TYPES.CONST:
        customStrings.push(addUniformString(id, valueType));
        break;
      default:
        console.warn(`uniform configuration not set for ${valueType}`);
    }
  });
  return { customUniforms, customStrings };
};

const addUniformString = (id: string, valueType: PropertyValueType) =>
  createDeclarationString(
    PROPERTY_TYPES.UNIFORM as PropertyType,
    valueType,
    id
  );
