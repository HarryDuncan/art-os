import { PROPERTY_VALUE_TYPES } from "../../buildShader.constants";
import { UniformValueConfig } from "../uniforms.types";

export const setUpCustom = (config: UniformValueConfig[] = []) => {
  const customUniforms = {};
  const customStrings: string[] = [];
  config.forEach(({ value, name, type }) => {
    switch (type) {
      case PROPERTY_VALUE_TYPES.INT:
        customUniforms[name] = { value: value ?? 0 };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.FLOAT:
        customUniforms[name] = { value: value ?? 0 };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.BOOL:
        customUniforms[name] = { value: value ?? false };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.VEC2:
        customUniforms[name] = { value: value ?? new THREE.Vector2() };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.VEC3:
        customUniforms[name] = { value: value ?? new THREE.Vector3() };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.VEC4:
        customUniforms[name] = { value: value ?? new THREE.Vector4() };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.MAT2:
        customUniforms[name] = { value: value ?? new THREE.Matrix2() };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.MAT3:
        customUniforms[name] = { value: value ?? new THREE.Matrix3() };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.MAT4:
        customUniforms[name] = { value: value ?? new THREE.Matrix4() };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.SAMPLER_2D:
        customUniforms[name] = { value: value ?? null };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.SAMPLER_CUBE:
        customUniforms[name] = { value: value ?? null };
        customStrings.push(addUniformString(name, type));
        break;
      case PROPERTY_VALUE_TYPES.VOID:
        break;
      case PROPERTY_VALUE_TYPES.CONST:
        customStrings.push(addUniformString(name, type));
        break;
      default:
        console.warn(`uniform configuration not set for ${type}`);
    }
  });
  return { customUniforms, customStrings };
};
