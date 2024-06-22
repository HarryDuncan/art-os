import { ShaderPropertyTypes } from "../../constants/buildShader.consts";
import { AttributeConfig } from "../../types";
import { createDeclarationString } from "../../helpers/createDeclarationString";

export const buildAttributes = (config: AttributeConfig[]) => {
  const declarationString = createDeclarationStrings(config);
  return declarationString;
};

const createDeclarationStrings = (config: AttributeConfig[]) =>
  config
    .map(({ id, valueType }) =>
      createDeclarationString(
        ShaderPropertyTypes.ATTRIBUTE as ShaderPropertyTypes,
        valueType,
        id
      )
    )
    .join(" \n ");
