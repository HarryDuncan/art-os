import { ShaderPropertyTypes } from "../../buildShader.constants";
import { AttributeConfig, PropertyType } from "../../buildShader.types";
import { createDeclarationString } from "../../helpers/createDeclarationString";

export const buildAttributes = (config: AttributeConfig[]) => {
  const declarationString = createDeclarationStrings(config);
  return { declarationString };
};

const createDeclarationStrings = (config: AttributeConfig[]) =>
  config
    .map(({ id, valueType }) =>
      createDeclarationString(
        ShaderPropertyTypes.ATTRIBUTE as PropertyType,
        valueType,
        id
      )
    )
    .join(" \n ");
