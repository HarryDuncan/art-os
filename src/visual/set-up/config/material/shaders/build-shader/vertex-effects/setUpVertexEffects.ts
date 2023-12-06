import {
  AttributeConfig,
  ShaderFunction,
  UniformConfig,
  VaryingConfig,
  VertexEffectConfig,
} from "../buildShader.types";
import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_EFFECT_POINT_NAMES } from "./vertexEffects.consts";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const {
    uniformConfigs,
    varyingConfigs,
    transformations,
    transformPoint,
    requiredFunctions,
    attributeConfigs,
  } = getVertexTransformations(vertexEffects);

  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * vec4(${transformPoint}.xyz, 1.0);`;

  return {
    uniformConfigs,
    varyingConfigs,
    transformations,
    requiredFunctions,
    viewMatrix,
    transformPoint,
    attributeConfigs,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  let transformPoint = VERTEX_EFFECT_POINT_NAMES.DEFAULT_POINT;
  const unmergedUniformConfigs: UniformConfig[] = [];
  const unmergedVaryingConfigs: VaryingConfig[][] = [];
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: ShaderFunction[][] = [];
  const unmergedAttributeConfigs: AttributeConfig[][] = [];
  vertexEffects.forEach((effect) => {
    const {
      uniformConfig,
      varyingConfig,
      transformation,
      pointName,
      requiredFunctions,
      attributeConfig = [],
    } = getVertexEffect(effect, transformPoint);
    transformPoint = pointName;
    unmergedUniformConfigs.push(uniformConfig);
    unmergedVaryingConfigs.push(varyingConfig);
    unmergedAttributeConfigs.push(attributeConfig);
    unmergedTransformations.push(transformation);
    allRequiredFunctions.push(requiredFunctions);
  });

  const mergedUniformConfigs = mergeUniformConfigs(unmergedUniformConfigs);
  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedRequiredFunction = reduceFunctions(allRequiredFunctions);
  const mergedAttributeConfigs = mergeAttributeConfigs(
    unmergedAttributeConfigs
  );
  const transformations = unmergedTransformations.join("");
  return {
    uniformConfigs: mergedUniformConfigs,
    varyingConfigs: mergedVaryingConfigs,
    transformations,
    transformPoint,
    requiredFunctions: mergedRequiredFunction,
    attributeConfigs: mergedAttributeConfigs,
  };
};
