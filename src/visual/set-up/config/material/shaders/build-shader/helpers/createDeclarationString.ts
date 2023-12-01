import { PropertyType, PropertyValueType } from "../buildShader.types";

export const createDeclarationString = (
  propertyType: PropertyType,
  valueType: PropertyValueType,
  propertyId: string
) => `${propertyType.toLowerCase()} ${valueType.toLowerCase()} ${propertyId};`;
