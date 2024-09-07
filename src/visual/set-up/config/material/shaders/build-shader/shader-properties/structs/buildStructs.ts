import { ShaderPropertyConfig, StructConfig } from "../../types";
import { STRUCT_DECLARATION } from "./structs.consts";

export const buildStruct = (config: StructConfig[]): string => {
  const formatted = config.map(({ id, properties }) => {
    const propertyObject = formatPropertyObject(properties);
    return `struct ${id} { \n ${propertyObject} \n };`;
  });
  const structDeclarations = [STRUCT_DECLARATION, ...formatted];
  return structDeclarations.join(" \n ");
};

const formatPropertyObject = (properties: ShaderPropertyConfig[]) =>
  properties
    .map(({ id, valueType }) => `${valueType.toLowerCase()} ${id};`)
    .join(" \n ");
