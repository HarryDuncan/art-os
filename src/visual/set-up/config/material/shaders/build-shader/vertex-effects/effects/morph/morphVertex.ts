import { ShaderPropertyValueTypes } from "../../../buildShader.consts";
import { MorphEffectProps, UniformConfig } from "../../../buildShader.types";
import {
  DEFAULT_MORPH_EFFECT_CONFIG,
  VERTEX_EFFECT_POINT_NAMES,
} from "../../vertexEffects.consts";
import { buildMorphTransforms } from "./buildMorphTransforms";
import { setUpMorphObjects } from "./setUpMorphObjects";

const getAttributeConfig = (morphCount: number) =>
  new Array(morphCount).fill("").flatMap((_value, index) => [
    {
      id: `morphPosition${index}`,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
      id: `morphNormal${index}`,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
  ]);
export const morphVertex = (
  previousPointName: string,
  effectProps: Partial<MorphEffectProps> | undefined = {}
) => {
  const formattedProps = mergeWithDefault(effectProps);
  const { morphCount, preTransformConfigs } = formattedProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.MORPHED_POINT;
  const uniformConfig = {
    defaultUniforms: ["uProgress", "uLoopCount"],
    customUniforms: [],
  } as UniformConfig;
  const attributeConfig = getAttributeConfig(morphCount);
  const { requiredFunctions, morphObjects, transforms } = setUpMorphObjects(
    morphCount,
    preTransformConfigs
  );
  const transformation = `
    vec3 currentPosition = ${previousPointName}.xyz;
    vec3 currentNormal = normal;
    ${transforms.map((value) => `${value} \n `).join(" \n ")}
    vec3 effect_direction = ${morphObjects[0].pointName} - currentPosition;
    vec3 normal_effect_direction = ${morphObjects[0].normalName} - normal;
    ${buildMorphTransforms(morphObjects, previousPointName)}
    vec3 ${pointName} = currentPosition + (effect_direction * (uProgress));
    `;
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    attributeConfig,
    varyingConfig: [],
    pointName,
  };
};

const mergeWithDefault = (effectProps: Partial<MorphEffectProps>) => {
  return { ...DEFAULT_MORPH_EFFECT_CONFIG, ...effectProps };
};
