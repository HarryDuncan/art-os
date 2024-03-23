import {
  ColorEffectProps,
  FragmentEffectData,
  InteractiveEffectProps,
  InteractiveFragmentEffect,
} from "../../../buildShader.types";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { EMPTY_UNIFORM_CONFIG } from "../../../shader-properties/uniforms/uniforms.consts";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import {
  FRAGMENT_COLOR_NAMES,
  FRAGMENT_EFFECT,
} from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";

export const getInteractiveEffects = (
  transformName: string,
  effectProps: InteractiveFragmentEffect
) => {
  const fragmentColorName = FRAGMENT_COLOR_NAMES.INTERACTIVE;

  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    fragmentColorName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    defaultInstantiation,
  } = getEffectData(fragmentColorName, effectProps);

  const transformation = `
        vec4 ${effectPointName} = ${transformName};
        ${defaultInstantiation}
        if(vAffected == 1.0){
            ${effectTransformation};
        }
    `;

  const mergedUniformConfigs = mergeUniformConfigs([effectUniforms]);
  const mergedVaryingConfigs = mergeVaryingConfigs([effectVaryings]);
  const mergedRequiredFunction = reduceFunctions([effectFunctions]);
  const mergedAttributeConfigs = mergeAttributeConfigs([effectAttributes]);
  return {
    requiredFunctions: mergedRequiredFunction,
    uniformConfig: mergedUniformConfigs,
    transformation,
    varyingConfig: mergedVaryingConfigs,
    attributeConfig: mergedAttributeConfigs,
    fragmentColorName: effectPointName,
  };
};

const getEffectData = (
  pointName: string,
  interactiveEffectProps: InteractiveEffectProps
): FragmentEffectData => {
  const { effectType, effectProps } = interactiveEffectProps;
  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(pointName, effectProps as Partial<ColorEffectProps>);
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect();
  }
};
