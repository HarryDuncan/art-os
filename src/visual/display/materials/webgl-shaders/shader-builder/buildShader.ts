import { buildFragment } from "./buildFragment";
import { AttributeConfig } from "./buildShader.types";
import { buildUniforms } from "./uniforms/buildUniforms";
import { buildVaryings } from "./varyings/buildVaryings";
import { buildVertex } from "./buildVertex";

export const buildShader = (shaderConfig) => {
  const { uniformSchema, varyingSchema, attributeSchema } = shaderConfig;
  const { uniforms, uniformStrings } = buildUniforms(uniformSchema);
  // const { varyingsInitialization, setVarying } = buildVaryings(varyingSchema);
  const attributes = buildAttributes(attributeSchema);
  const vertexEffects = buildVertex([]);
  const fragmentEffects = buildFragment([]);

  const vertexShader = `${uniformStrings}${varyingsInitialization}${attributes}${vertexEffects}`;
  const fragmentShader = `${uniformStrings}${varyingsInitialization}${attributes}${fragmentEffects}`;

  return { vertexShader, fragmentShader, uniforms };
};

const readShadersFromFiles = () => {};
const setUpShaders = () => {};

export const buildAttributes = (attributeConfig: AttributeConfig[]) =>
  attributeConfig
    .map(({ name, type }) => `attribute ${name} ${type}`)
    .join(" ");
