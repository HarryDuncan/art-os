import { defaultFragmentEffect } from "./effects/defaultFragmentEffect/defaultFragmentEffect";
import { getFragmentEffects } from "./effects/getFragmentEffects";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { FragmentEffectConfig, ShaderFunction } from "../buildShader.types";
import { reduceFunctions } from "../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../shader-properties/attributes/helpers/mergeAttributeConfigs";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[]
) => {
  const {
    finalFragmentColor,
    varyingConfigs,
    uniformConfigs,
    transformations,
    attributeConfigs,
    requiredFunctions,
  } = getFragmentColors(fragmentEffects);

  const fragColor = `gl_FragColor = ${finalFragmentColor};`;
  return {
    fragColor,
    varyingConfigs,
    uniformConfigs,
    transformations,
    attributeConfigs,
    requiredFunctions,
  };
};

export const getFragmentColors = (fragmentEffects: FragmentEffectConfig[]) => {
  let currentFragmentColorName = "fragColor";
  const {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
    unmergedAttributeConfigs,
  } = setUpInitialParameters();
  const allRequiredFunctions: ShaderFunction[][] = [];
  fragmentEffects.forEach((effect) => {
    const {
      varyingConfig,
      uniformConfig,
      transformation,
      fragName,
      requiredFunctions,
      attributeConfig,
    } = getFragmentEffects(effect, currentFragmentColorName);
    unmergedVaryingConfigs.push(varyingConfig);
    unmergedUniformConfigs.push(uniformConfig);
    unmergedAttributeConfigs.push(attributeConfig);
    unmergedTransformations.push(transformation);
    allRequiredFunctions.push(requiredFunctions);
    currentFragmentColorName = fragName;
  });
  // console.log(fragmentEffects);
  // console.log(unmergedTransformations);
  const mergedUniformConfigs = mergeUniformConfigs(unmergedUniformConfigs);
  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedAttributeConfigs = mergeAttributeConfigs(
    unmergedAttributeConfigs
  );
  const mergedRequiredFunction = reduceFunctions(allRequiredFunctions);
  const mergedTransformations = unmergedTransformations.join("");
  return {
    finalFragmentColor: currentFragmentColorName,
    varyingConfigs: mergedVaryingConfigs,
    uniformConfigs: mergedUniformConfigs,
    transformations: mergedTransformations,
    attributeConfigs: mergedAttributeConfigs,
    requiredFunctions: mergedRequiredFunction,
  };
};

const setUpInitialParameters = () => {
  const {
    varyingConfig,
    uniformConfig,
    transformation,
    attributeConfig,
  } = defaultFragmentEffect();
  const unmergedVaryingConfigs = [varyingConfig];
  const unmergedUniformConfigs = [uniformConfig];
  const unmergedTransformations = [transformation];
  const unmergedAttributeConfigs = [attributeConfig];
  return {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
    unmergedAttributeConfigs,
  };
};
