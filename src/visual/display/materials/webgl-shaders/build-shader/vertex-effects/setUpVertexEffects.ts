import { VertexEffectConfig } from "../buildShader.types";
import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { UniformConfig } from "../shader-properties/uniforms/uniforms.types";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { VaryingConfig } from "../shader-properties/varyings/varyings.types";
import { getVertexEffect } from "./effects/getVertexEffect";
import { VERTEX_EFFECT_POINT_NAMES } from "./vertexEffects.consts";

export const setUpVertexEffects = (vertexEffects: VertexEffectConfig[]) => {
  const {
    uniformConfigs,
    varyingConfigs,
    transformations,
    transformPoint,
    requiredFunctions,
  } = getVertexTransformations(vertexEffects);

  const viewMatrix = `gl_Position = projectionMatrix * modelViewMatrix * ${transformPoint};`;

  return {
    uniformConfigs,
    varyingConfigs,
    transformations,
    requiredFunctions,
    viewMatrix,
  };
};

const getVertexTransformations = (vertexEffects: VertexEffectConfig[]) => {
  let transformPoint = VERTEX_EFFECT_POINT_NAMES.DEFAULT_POINT;
  const unmergedUniformConfigs: UniformConfig[] = [];
  const unmergedVaryingConfigs: VaryingConfig[] = [];
  const unmergedTransformations: string[] = [];
  const allRequiredFunctions: unknown[] = [];

  vertexEffects.forEach((effect) => {
    const {
      uniformConfig,
      varyingConfig,
      transformation,
      pointName,
      requiredFunctions,
    } = getVertexEffect(effect, transformPoint);
    transformPoint = pointName;
    unmergedUniformConfigs.push(uniformConfig);
    unmergedVaryingConfigs.push(varyingConfig);
    unmergedTransformations.push(transformation);
    allRequiredFunctions.push(requiredFunctions);
  });

  console.log(unmergedUniformConfigs);
  const mergedUniformConfigs = mergeUniformConfigs(unmergedUniformConfigs);
  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedRequiredFunction = reduceFunctions(allRequiredFunctions);
  const transformations = unmergedTransformations.join("");
  return {
    uniformConfigs: mergedUniformConfigs,
    varyingConfigs: mergedVaryingConfigs,
    transformations,
    transformPoint,
    requiredFunctions: mergedRequiredFunction,
  };
};
