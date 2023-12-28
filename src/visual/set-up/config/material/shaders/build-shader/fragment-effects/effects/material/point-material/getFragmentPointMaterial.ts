import { ShaderPropertyValueTypes } from "../../../../buildShader.constants";
import {
  AttributeConfig,
  DefaultUniform,
  FragmentEffectData,
  PointDefinition,
  PointMaterialEffectProps,
  ShaderFunction,
  VaryingConfig,
} from "../../../../buildShader.types";
import {
  DEFAULT_POINT_MATERIAL,
  FRAGMENT_COLOR_NAMES,
} from "../../../fragmentEffects.consts";
import { VARYING_TYPES } from "../../../../shader-properties/varyings/varyings.consts";
import { createColorVectorString } from "../../../../helpers/createColorVectorString";
import { getPointColor } from "./getPointColor";

const getCustomUniforms = (pointDefinitions: PointDefinition[]) =>
  pointDefinitions.map(({ id }) => ({
    id,
    valueType: ShaderPropertyValueTypes.SAMPLER2D,
  }));

const getRequiredFunctions = () => [] as ShaderFunction[];

const getVaryings = () =>
  [
    {
      id: "vPointDisplay",
      varyingType: VARYING_TYPES.ATTRIBUTE,
      attributeKey: "pointDisplay",
      valueType: ShaderPropertyValueTypes.FLOAT,
    },
    {
      id: "vPointType",
      varyingType: VARYING_TYPES.ATTRIBUTE,
      attributeKey: "pointType",
      valueType: ShaderPropertyValueTypes.FLOAT,
    },
  ] as VaryingConfig[];

const getPointTextureInstantiations = (
  fragmentColorName: string,
  pointDefinitions: PointDefinition[]
) => {
  const increment = 1 / pointDefinitions.length;
  return pointDefinitions
    .map(({ id, pointColor }, index) => {
      const lowerBound = (index * increment).toFixed(1);
      const upperBound = ((index + 1) * increment).toFixed(1);
      return `if(vPointType > ${lowerBound} && vPointType < ${
        upperBound === "1.0" ? "1.1" : upperBound
      }){
            ${fragmentColorName} = ${createColorVectorString(
        pointColor,
        true
      )} * texture2D(${id}, gl_PointCoord);
        } \n `;
    })
    .join(" \n ");
};

const ATTRIBUTE_CONFIG = [
  { id: "pointType", valueType: ShaderPropertyValueTypes.FLOAT },
  { id: "pointDisplay", valueType: ShaderPropertyValueTypes.FLOAT },
] as AttributeConfig[];

export const getFragmentPointMaterial = (
  effectProps: Partial<PointMaterialEffectProps> | undefined,
  _transformColorName
): FragmentEffectData => {
  const formattedEffectProps = formatWithDefaultEffectProps(effectProps);
  const { pointDefinitions, defaultColor } = formattedEffectProps;
  const fragmentColorName = FRAGMENT_COLOR_NAMES.POINT_MATERIAL;
  const uniformConfig = {
    defaultUniforms: ["uOpacity"] as DefaultUniform[],
    customUniforms: getCustomUniforms(pointDefinitions),
  };
  const varyingConfig = getVaryings();
  const transformation = `
  float opacity = uOpacity;
  if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
  ${getPointColor(fragmentColorName, defaultColor)}       
  ${getPointTextureInstantiations(fragmentColorName, pointDefinitions)}
  `;
  const requiredFunctions = getRequiredFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: ATTRIBUTE_CONFIG,
    fragmentColorName,
  };
};

const formatWithDefaultEffectProps = (
  parsedConfig: Partial<PointMaterialEffectProps> = {}
): PointMaterialEffectProps => {
  return { ...DEFAULT_POINT_MATERIAL, ...parsedConfig };
};
