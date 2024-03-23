import { POINT_PARENTS } from "../../../buildShader.constants";
import {
  AttributeConfig,
  ColorEffectProps,
  FragmentEffectData,
  InteractiveEffectProps,
  OpacityEffectProps,
  TriggeredFragmentEffect,
  TriggeredFragmentEffectProps,
} from "../../../buildShader.types";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";

import {
  DEFAULT_TRIGGERED_EFFECT,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "./triggeredEffect.consts";

import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import {
  FRAGMENT_COLOR_NAMES,
  FRAGMENT_EFFECT,
} from "../../fragmentEffects.consts";
import { color } from "../color/color";
import { defaultFragmentEffect } from "../defaultFragmentEffect/defaultFragmentEffect";
import { opacity } from "../opacity/opacity";

export const triggeredEffect = (
  transformName: string,
  effectProps: TriggeredFragmentEffect
) => {
  const fragmentColorName = generateUniquePointName(
    FRAGMENT_COLOR_NAMES.TRIGGERED,
    POINT_PARENTS.TRIGGERED
  );
  const uniformConfig = TRIGGERED_UNIFORM_CONFIG;
  const varyingConfig = TRIGGERED_VARYING_CONFIG;
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    fragmentColorName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    fragmentColorInstantiation,
  } = getEffectData(fragmentColorName, effectProps);

  const requiredFunctions = [];
  const attributeConfig = [] as AttributeConfig[];

  const transformation = formatTransform(
    effectPointName,
    transformName,
    fragmentColorInstantiation,
    effectTransformation
  );
  const mergedUniformConfigs = mergeUniformConfigs([
    effectUniforms,
    uniformConfig,
  ]);
  const mergedVaryingConfigs = mergeVaryingConfigs([
    effectVaryings,
    varyingConfig,
  ]);
  const mergedRequiredFunction = reduceFunctions([
    effectFunctions,
    requiredFunctions,
  ]);
  const mergedAttributeConfigs = mergeAttributeConfigs([
    attributeConfig,
    effectAttributes,
  ]);
  return {
    requiredFunctions: mergedRequiredFunction,
    uniformConfig: mergedUniformConfigs,
    attributeConfig: mergedAttributeConfigs,
    transformation,
    varyingConfig: mergedVaryingConfigs,
    pointName: effectPointName,
  };
};

const formatTransform = (
  pointName,
  transformPoint,
  fragmentColorInstantiation,
  transform
) => {
  return `vec3 ${pointName} = ${transformPoint}.xyz;
            ${fragmentColorInstantiation ?? ""}
            float isTriggered = 0.0;
            if(uIsTriggered >= 1.0){
                ${transform}
                isTriggered = 1.0;
            }
            `;
};

const getEffectData = (
  pointName: string,
  triggeredEffectProps: TriggeredFragmentEffect
): FragmentEffectData => {
  const { effectType, effectProps } = triggeredEffectProps;
  const formattedEffectProps = {
    ...DEFAULT_TRIGGERED_EFFECT,
    ...effectProps,
  };
  switch (effectType) {
    case FRAGMENT_EFFECT.COLOR:
      return color(
        pointName,
        formattedEffectProps as Partial<ColorEffectProps>
      );
    case FRAGMENT_EFFECT.OPACITY:
      return opacity(
        pointName,
        formattedEffectProps as Partial<OpacityEffectProps>
      );
    default:
      console.warn(`No interactive effect configured for ${effectProps}`);
      return defaultFragmentEffect();
  }
};
