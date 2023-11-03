import { PROPERTY_TYPES } from "../../buildShader.constants";
import { AttributeConfig, PropertyType } from "../../buildShader.types";
import { createDeclarationString } from "../../helpers/createDeclarationString";
import { getDefaultValueAsString } from "../../helpers/getDefaultValue";
import {
  VARYING_TYPES,
  V_CUSTOM_INSTANTIATION,
  V_DECLARATION,
  V_DEFAULT_INSTANTIATION,
} from "./varyings.consts";
import { VaryingConfig } from "./varyings.types";

export const buildVaryings = (
  varyingSchema: VaryingConfig[],
  attributeSchema
) => {
  const declaration = varyingDeclarations(varyingSchema);
  const instantiation = varyingInstantiation(varyingSchema, attributeSchema);
  return { declaration, instantiation };
};

const varyingDeclarations = (config: VaryingConfig[]) => {
  const declarationStrings = config.map(({ id, valueType }) =>
    createDeclarationString(
      PROPERTY_TYPES.VARYING as PropertyType,
      valueType,
      id
    )
  );
  const declaration = [V_DECLARATION, ...declarationStrings].join(" \n ");
  return declaration;
};

const varyingInstantiation = (
  varyingConfig: VaryingConfig[],
  attributeConfig: AttributeConfig
) => {
  const defaultVaryingStrings = getDefaultVaryingString(varyingConfig);
  const attributeVaryingStrings = getAttributeVaryingStrings(
    varyingConfig,
    attributeConfig
  );
  const customVaryingsStrings = getCustomVaryingStrings(varyingConfig);
  return [
    ...defaultVaryingStrings,
    ...attributeVaryingStrings,
    ...customVaryingsStrings,
  ].join(" \n ");
};

const getDefaultVaryingString = (config: VaryingConfig[]) => {
  const defaultVaryings: VaryingConfig[] = config.filter(
    (item) => item.varyingType === VARYING_TYPES.DEFAULT
  );
  if (!defaultVaryings.length) return [];
  const strings = [V_DEFAULT_INSTANTIATION];
  defaultVaryings.forEach((item: VaryingConfig) => {
    switch (item.id) {
      case "vUv":
        strings.push("vUv = uv;");
    }
  });
  return strings;
};

const getCustomVaryingStrings = (config: VaryingConfig[]) => {
  const customVaryings = config.filter(
    ({ varyingType }) => varyingType === VARYING_TYPES.CUSTOM
  );
  if (!customVaryings.length) return [];
  const strings = [V_CUSTOM_INSTANTIATION];
  customVaryings.forEach((item: VaryingConfig) => {
    strings.push(
      `${item.id} = ${item.value ?? getDefaultValueAsString(item.valueType)};`
    );
  });
  return strings;
};

const getAttributeVaryingStrings = (
  config: VaryingConfig[],
  attributeConfig: AttributeConfig
) => {
  if (!config.length) return [];
  return [];
};
