import { AttributeConfig } from "../buildShader.types";
import {
  getDefaultValue,
  getDefaultValueAsString,
} from "../helpers/getDefaultValue";
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

const varyingDeclarations = (varyingSchema: VaryingConfig[]) => {
  if (!varyingSchema.length) {
    return ``;
  }
  const declarationStrings = varyingSchema.map(({ type, name }) => {
    return `varying ${type.toLowerCase()} ${name};`;
  });
  const declaration = `${V_DECLARATION} \n ${declarationStrings.join(" \n ")}`;
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
    switch (item.name) {
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
      `${item.name} = ${item.value ?? getDefaultValueAsString(item.type)};`
    );
  });
  return strings;
};

const getAttributeVaryingStrings = (
  config: VaryingConfig[],
  attributeConfig: AttributeConfig
) => {
  if (!config.length) return "";
  return [];
};
