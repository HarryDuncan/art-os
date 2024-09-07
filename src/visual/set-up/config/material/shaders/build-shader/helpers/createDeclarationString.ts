import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../constants/buildShader.consts";

export const createDeclarationString = (
  propertyType: ShaderPropertyTypes,
  valueType: ShaderPropertyValueTypes,
  id: string,
  arrayLength?: number
) =>
  `${propertyType.toLowerCase()} ${getValueTypeString(valueType)} ${id}${
    arrayLength ? `[${arrayLength}]` : ""
  };`;

const getValueTypeString = (valueType: ShaderPropertyValueTypes) => {
  switch (valueType) {
    case ShaderPropertyValueTypes.SAMPLER2D:
      return "sampler2D";
    default:
      return valueType.toLowerCase();
  }
};
