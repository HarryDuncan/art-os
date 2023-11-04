import { MAIN_END, MAIN_START } from "./buildShader.constants";
import { AttributeConfig, BuiltShaderConfig } from "./buildShader.types";
import { setUpFragmentEffects } from "./fragment-effects/setUpFragmentEffects";
import { buildUniforms } from "./shader-properties/uniforms/buildUniforms";
import { mergeUniformConfigs } from "./shader-properties/uniforms/helpers/mergeUniformConfigs";
import { EMPTY_UNIFORM_CONFIG } from "./shader-properties/uniforms/uniforms.consts";
import { UniformConfig } from "./shader-properties/uniforms/uniforms.types";
import { buildVaryings } from "./shader-properties/varyings/buildVaryings";
import { mergeVaryingConfigs } from "./shader-properties/varyings/helpers/mergeVaryingConfigs";
import { VaryingConfig } from "./shader-properties/varyings/varyings.types";
import { setUpVertexEffects } from "./vertex-effects/setUpVertexEffects";

export const buildShader = (shaderConfig: BuiltShaderConfig) => {
  const {
    vertexEffectConfigs,
    fragmentEffectConfigs,
    uniformConfig,
    varyingConfig,
    attributeConfig,
  } = shaderConfig;
  const vertexEffects = setUpVertexEffects(vertexEffectConfigs);
  const fragmentEffects = setUpFragmentEffects(fragmentEffectConfigs);

  const shaderUniforms: UniformConfig[] = [
    vertexEffects.uniformConfigs,
    fragmentEffects.uniformConfigs,
    uniformConfig ?? { ...EMPTY_UNIFORM_CONFIG },
  ];
  const mergedShaderUniforms = mergeUniformConfigs(shaderUniforms);

  // const shaderAttributes = [

  // ]
  // const mergedAttributeConfigs = mergeAttributeConfigs()

  const shaderVaryings = [
    vertexEffects.varyingConfigs,
    fragmentEffects.varyingConfigs,
    varyingConfig ?? [],
  ];
  const mergedShaderVaryings = mergeVaryingConfigs(
    shaderVaryings
  ) as VaryingConfig[];

  const { uniforms, uniformDeclaration } = buildUniforms(mergedShaderUniforms);
  const {
    declaration: varyingDeclaration,
    instantiation: varyingInstantiation,
  } = buildVaryings(mergedShaderVaryings, []);
  //  const attributes = buildAttributes(attributeSchema);

  const vertexShader = formatVertexShader(
    uniformDeclaration,
    varyingDeclaration,
    varyingInstantiation,
    vertexEffects.transformations,
    vertexEffects.viewMatrix
  );
  const fragmentShader = formatFragmentShader(
    uniformDeclaration,
    varyingDeclaration,
    fragmentEffects.transformations,
    fragmentEffects.fragColor
  );
  return { vertexShader, fragmentShader, uniforms };
};

export const buildAttributes = (attributeConfig: AttributeConfig[]) =>
  attributeConfig
    .map(({ id, valueType }) => `attribute ${id} ${valueType}`)
    .join(" ");

const formatVertexShader = (
  uniformDeclarations: string,
  varyingDeclaration,
  varyingInstantiation,
  vertexTransformations: string,
  viewMatrix: string
) => {
  return [
    uniformDeclarations,
    varyingDeclaration,
    MAIN_START,
    varyingInstantiation,
    vertexTransformations,
    viewMatrix,
    MAIN_END,
  ].join(" \n ");
};

export const formatFragmentShader = (
  uniformDeclaration: string,
  varyingDeclaration: string,
  fragmentTransformations: string,
  fragColor: string
) => {
  const shaderCodeArray: string[] = [
    uniformDeclaration,
    varyingDeclaration,
    MAIN_START,
    fragmentTransformations,
    fragColor,
    MAIN_END,
  ];
  const filteredShaderCode = shaderCodeArray.filter((str) => str !== "");
  return filteredShaderCode.join(" \n ");
};
