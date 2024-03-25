import { MAIN_END, MAIN_START } from "./buildShader.consts";
import {
  AttributeConfig,
  BuiltShaderConfig,
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
} from "./buildShader.types";
import { setUpFragmentEffects } from "./fragment-effects/setUpFragmentEffects";
import { buildAttributes } from "./shader-properties/attributes/buildAttributes";
import { mergeAttributeConfigs } from "./shader-properties/attributes/helpers/mergeAttributeConfigs";
import { buildUniforms } from "./shader-properties/uniforms/buildUniforms";
import { mergeUniformConfigs } from "./shader-properties/uniforms/helpers/mergeUniformConfigs";
import { EMPTY_UNIFORM_CONFIG } from "./shader-properties/uniforms/uniforms.consts";
import { buildVaryings } from "./shader-properties/varyings/buildVaryings";
import { mergeVaryingConfigs } from "./shader-properties/varyings/helpers/mergeVaryingConfigs";
import { setUpVertexEffects } from "./vertex-effects/setUpVertexEffects";

export const buildShader = (shaderConfig: BuiltShaderConfig) => {
  const {
    vertexEffectConfigs,
    fragmentEffectConfigs,
    uniformConfig,
    varyingConfig,
    attributeConfig,
  } = shaderConfig;
  const fragmentEffects = setUpFragmentEffects(fragmentEffectConfigs);
  const vertexEffects = setUpVertexEffects(vertexEffectConfigs);

  const shaderUniforms: UniformConfig[] = [
    vertexEffects.uniformConfigs,
    fragmentEffects.uniformConfigs,
    uniformConfig ?? { ...EMPTY_UNIFORM_CONFIG },
  ];
  const mergedShaderUniforms = mergeUniformConfigs(shaderUniforms);

  const shaderAttributes = [
    attributeConfig,
    fragmentEffects.attributeConfigs,
    vertexEffects.attributeConfigs,
  ] as AttributeConfig[][];
  const combinedAttributeConfigs = mergeAttributeConfigs(shaderAttributes);
  const attributes = buildAttributes(combinedAttributeConfigs);
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
  } = buildVaryings(
    mergedShaderVaryings,
    combinedAttributeConfigs,
    vertexEffects.previousPointName
  );

  const vertexShader = formatVertexShader(
    attributes,
    uniformDeclaration,
    varyingDeclaration,
    varyingInstantiation,
    vertexEffects.requiredFunctions,
    vertexEffects.transformations,
    vertexEffects.viewMatrix
  );
  const fragmentShader = formatFragmentShader(
    uniformDeclaration,
    varyingDeclaration,
    fragmentEffects.requiredFunctions,
    fragmentEffects.transformations,
    fragmentEffects.fragColor
  );
  return {
    vertexShader,
    fragmentShader,
    uniforms,
    attributeConfigs: combinedAttributeConfigs,
  };
};

const formatVertexShader = (
  attributes: string,
  uniformDeclarations: string,
  varyingDeclaration: string,
  varyingInstantiation: string,
  vertexFunctions: ShaderFunction[],
  vertexTransformations: string,
  viewMatrix: string
) => {
  return [
    attributes,
    uniformDeclarations,
    varyingDeclaration,
    vertexFunctions
      .map(({ functionDefinition }) => functionDefinition)
      .join(""),
    MAIN_START,
    vertexTransformations,
    varyingInstantiation,
    viewMatrix,
    MAIN_END,
  ].join(" \n ");
};

export const formatFragmentShader = (
  uniformDeclaration: string,
  varyingDeclaration: string,
  fragmentFunctions: ShaderFunction[],
  fragmentTransformations: string,
  fragColor: string
) => {
  const shaderCodeArray: string[] = [
    uniformDeclaration,
    varyingDeclaration,
    ...fragmentFunctions.map(({ functionDefinition }) => functionDefinition),
    MAIN_START,
    fragmentTransformations,
    fragColor,
    MAIN_END,
  ];
  const filteredShaderCode = shaderCodeArray.filter((str) => str !== "");
  return filteredShaderCode.join(" \n ");
};
