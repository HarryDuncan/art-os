import {
  DEFAULT_VERTEX_EFFECT,
  POINT_PARENTS,
  TRIGGERED_FRAGMENT_EFFECT,
} from "../../../buildShader.consts";
import {
  AttributeConfig,
  ExpandEffectProps,
  ExplodeEffectProps,
  InteractiveEffectProps,
  TriggeredEffectProps,
  TriggeredVertexEffect,
} from "../../../buildShader.types";
import {
  VERTEX_EFFECTS,
  VERTEX_EFFECT_POINT_NAMES,
} from "../../vertexEffects.consts";
import { explode } from "../displacement/explode/explode";
import { mergeUniformConfigs } from "../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import { mergeVaryingConfigs } from "../../../shader-properties/varyings/helpers/mergeVaryingConfigs";
import { reduceFunctions } from "../../../helpers/reduceFunctions";
import { mergeAttributeConfigs } from "../../../shader-properties/attributes/helpers/mergeAttributeConfigs";
import { VertexEffectData } from "../../vertexEffects.types";
import {
  DEFAULT_TRIGGERED_EFFECT,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "./triggeredEffect.consts";

import { generateUniquePointName } from "../../../helpers/generateUniquePointName";
import { triggeredEffectTransform } from "./triggeredEffectTransforms";
import { formatVertexParameters } from "../../../helpers/formatVertexParameters";

export const triggeredEffect = (
  previousPointName: string,
  effectProps: TriggeredVertexEffect
) => {
  const triggeredEffectProps = formatVertexParameters(
    effectProps,
    DEFAULT_TRIGGERED_EFFECT
  ) as TriggeredVertexEffect;
  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.TRIGGERED_POINT,
    POINT_PARENTS.TRIGGERED
  );
  const uniformConfig = TRIGGERED_UNIFORM_CONFIG;
  const varyingConfig = TRIGGERED_VARYING_CONFIG;
  const {
    transformation,
    effectUniforms,
    effectVaryings,
    effectPointName,
    effectFunctions,
    effectAttributes,
  } = triggeredEffectTransform(
    pointName,
    previousPointName,
    triggeredEffectProps
  );

  const requiredFunctions = [];
  const attributeConfig = [] as AttributeConfig[];

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
