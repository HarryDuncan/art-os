import {
  ShaderPropertyTypes,
  ShaderPropertyValueTypes,
} from "../buildShader.consts";

export const createDeclarationString = (
  propertyType: ShaderPropertyTypes,
  valueType: ShaderPropertyValueTypes,
  propertyId: string
) =>
  `${propertyType.toLowerCase()} ${getValueTypeString(
    valueType
  )} ${propertyId};`;

const getValueTypeString = (valueType: ShaderPropertyValueTypes) => {
  switch (valueType) {
    case ShaderPropertyValueTypes.SAMPLER2D:
      return "sampler2D";
    default:
      return valueType.toLowerCase();
  }
};
