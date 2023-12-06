import { ShaderPropertyValueTypes } from "../../../buildShader.constants";
import { MorphEffectProps, UniformConfig } from "../../../buildShader.types";
import {
  DEFAULT_MORPH_EFFECT_CONFIG,
  VERTEX_EFFECT_POINT_NAMES,
} from "../../vertexEffects.consts";

const makeMorphTransforms = (morphCount, transformName) =>
  new Array(morphCount)
    .fill("")
    .map((_value, index) => {
      const currentMorph = index;
      const targetMorph = index + 1;
      return ` 
        if(uLoopCount == ${targetMorph}){
            currentPosition = morphPosition_${currentMorph};
            currentNormal = morphNormal_${currentMorph};
            ${
              targetMorph > morphCount - 1
                ? `effect_direction = ${transformName}.xyz - currentPosition;
            normal_effect_direction = normal - currentNormal;`
                : `effect_direction = morphPosition_${targetMorph} - currentPosition;
            normal_effect_direction = morphNormal_${targetMorph} - currentNormal;`
            }
            
        } \n `;
    })
    .join(" \n ");

const getAttributeConfig = (morphCount: number) =>
  new Array(morphCount).fill("").flatMap((_value, index) => [
    {
      id: `morphPosition_${index}`,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
    {
      id: `morphNormal_${index}`,
      valueType: ShaderPropertyValueTypes.VEC3,
    },
  ]);
export const morphVertex = (
  transformName: string,
  effectProps: Partial<MorphEffectProps> | undefined = {}
) => {
  const formattedProps = mergeWithDefault(effectProps);
  const { morphCount } = formattedProps;
  const pointName = VERTEX_EFFECT_POINT_NAMES.MORPHED_POINT;
  const uniformConfig = {
    defaultUniforms: ["uProgress", "uLoopCount"],
    customUniforms: [],
  } as UniformConfig;
  const attributeConfig = getAttributeConfig(morphCount);
  const transformation = `
    vec3 currentPosition = ${transformName}.xyz;
    vec3 currentNormal = normal;
    vec3 effect_direction = morphPosition_0 - currentPosition;
    vec3 normal_effect_direction = morphNormal_0 - normal;
    ${makeMorphTransforms(morphCount, transformName)}
    vec3 ${pointName} = currentPosition + (effect_direction * (uProgress));
    `;
  return {
    requiredFunctions: [],
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
