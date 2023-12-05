import { ShaderPropertyValueTypes } from "../buildShader.constants";
import { PropertyType } from "../buildShader.types";

export const createDeclarationString = (
  propertyType: PropertyType,
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
