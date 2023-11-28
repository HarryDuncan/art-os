import { defaultFragmentEffect } from "./effects/defaultFragmentEffect/defaultFragmentEffect";
import { getFragmentEffects } from "./effects/getFragmentEffects";
import { mergeUniformConfigs } from "../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { FragmentEffectConfig } from "../buildShader.types";

export const setUpFragmentEffects = (
  fragmentEffects: FragmentEffectConfig[]
) => {
  const {
    finalFragmentColor,
    varyingConfigs,
    uniformConfigs,
    transformations,
    requiredFunctions,
  } = getFragmentColors(fragmentEffects);

  const fragColor = `gl_FragColor = ${finalFragmentColor};`;
  return {
    fragColor,
    varyingConfigs,
    uniformConfigs,
    transformations,
    requiredFunctions,
  };
};

export const getFragmentColors = (fragmentEffects: FragmentEffectConfig[]) => {
  let currentFragmentColorName = "fragColor";
  const {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
  } = setUpInitialParameters();
  const allRequiredFunctions: unknown[] = [];
  fragmentEffects.forEach((effect) => {
    const {
      varyingConfig,
      uniformConfig,
      transformation,
      fragmentColorName,
    } = getFragmentEffects(effect, currentFragmentColorName);
    unmergedVaryingConfigs.push(varyingConfig);
    unmergedUniformConfigs.push(uniformConfig);
    unmergedTransformations.push(transformation);
    currentFragmentColorName = fragmentColorName;
  });
  const mergedUniformConfigs = mergeUniformConfigs(unmergedUniformConfigs);
  const mergedVaryingConfigs = mergeVaryingConfigs(unmergedVaryingConfigs);
  const mergedTransformations = unmergedTransformations.join("");
  return {
    finalFragmentColor: currentFragmentColorName,
    varyingConfigs: mergedVaryingConfigs,
    uniformConfigs: mergedUniformConfigs,
    transformations: mergedTransformations,
    requiredFunctions: allRequiredFunctions,
  };
};

const setUpInitialParameters = () => {
  const {
    varyingConfig,
    uniformConfig,
    transformation,
  } = defaultFragmentEffect();
  const unmergedVaryingConfigs = [varyingConfig];
  const unmergedUniformConfigs = [uniformConfig];
  const unmergedTransformations = [transformation];
  return {
    unmergedVaryingConfigs,
    unmergedUniformConfigs,
    unmergedTransformations,
  };
};
