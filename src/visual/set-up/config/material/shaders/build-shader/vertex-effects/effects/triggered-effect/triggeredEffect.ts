import {
  DEFAULT_VERTEX_EFFECT,
  POINT_PARENTS,
  TRIGGERED_FRAGMENT_EFFECT,
} from "../../../buildShader.constants";
import {
  AttributeConfig,
  ExpandEffectProps,
  ExplodeEffectProps,
  InteractiveEffectProps,
  TriggeredEffectProps,
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
  EMPTY_EFFECT,
  TRIGGERED_UNIFORM_CONFIG,
  TRIGGERED_VARYING_CONFIG,
} from "./triggeredEffect.consts";
import { expand } from "../displacement/expand/expand";
import { generateUniquePointName } from "../../../helpers/generateUniquePointName";

export const triggeredEffect = (
  transformName: string,
  effectProps: InteractiveEffectProps
) => {
  const pointName = generateUniquePointName(
    VERTEX_EFFECT_POINT_NAMES.TRIGGERED_POINT,
    POINT_PARENTS.TRIGGERED
  );
  const uniformConfig = TRIGGERED_UNIFORM_CONFIG;
  const varyingConfig = TRIGGERED_VARYING_CONFIG;
  const {
    uniformConfig: effectUniforms,
    varyingConfig: effectVaryings,
    transformation: effectTransformation,
    pointName: effectPointName,
    requiredFunctions: effectFunctions,
    attributeConfig: effectAttributes,
    vertexPointInstantiation,
  } = getEffectData(pointName, effectProps);

  const requiredFunctions = [];
  const attributeConfig = [] as AttributeConfig[];

  const transformation = formatTransform(
    pointName,
    transformName,
    vertexPointInstantiation,
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
  vertexPointInstantiation,
  transform
) => {
  return `vec3 ${pointName} = ${transformPoint}.xyz;
            ${vertexPointInstantiation ?? ""}
            float isTriggered = 0.0;
            if(uIsTriggered >= 1.0){
                ${transform}
                isTriggered = 1.0;
            }
            `;
};
const getEffectData = (
  pointName,
  triggeredEffectProps: TriggeredEffectProps
): VertexEffectData => {
  const { effectType, effectProps } = triggeredEffectProps;
  const formattedEffectProps = {
    ...DEFAULT_TRIGGERED_EFFECT,
    ...effectProps,
  };
  switch (effectType) {
    case VERTEX_EFFECTS.EXPLODE:
      return explode(
        pointName,
        formattedEffectProps as Partial<ExplodeEffectProps>
      );
    case VERTEX_EFFECTS.EXPAND:
      return expand(
        pointName,
        formattedEffectProps as Partial<ExpandEffectProps>
      );
    case TRIGGERED_FRAGMENT_EFFECT.EMPTY:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
    default:
      return { ...DEFAULT_VERTEX_EFFECT, pointName };
  }
};
