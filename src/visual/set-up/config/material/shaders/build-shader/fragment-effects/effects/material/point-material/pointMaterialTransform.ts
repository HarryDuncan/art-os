import { ShaderPropertyValueTypes } from "../../../../constants";
import { fragmentEffectToEffectData } from "../../../../helpers/fragmentEffectToEffectData";
import { mergeUniformConfigs } from "../../../../shader-properties/uniforms/helpers/mergeUniformConfigs";
import {
  PointMaterialFragmentEffectProps,
  PointTexture,
} from "../../../../types";
import { matcapMaterial } from "../matcap/matcap";
import { getPointColor } from "./point-material-functions/getPointColor";
import { getPointTexture } from "./point-material-functions/getPointTextures";

const setUpTextureUniforms = (pointTextures: PointTexture[]) =>
  pointTextures.map(({ id }) => ({
    id,
    valueType: ShaderPropertyValueTypes.SAMPLER2D,
  }));

export const pointMaterialTransform = (
  fragName: string,
  _previousFragName: string,
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { pointTextures } = pointEffectProps;
  const defaultEffectUniforms = {
    defaultUniforms: [],
    customUniforms: setUpTextureUniforms(pointTextures),
  };

  const {
    effectTransform,
    effectFragName,
    effectAttributes,
    effectVaryings,
    effectRequiredFunctions,
    effectUniforms: returnedEffectUniforms,
  } = getEffectData(fragName, pointEffectProps);

  const transform = `
 float opacity = 1.0;
  ${effectTransform}
   if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
 
  vec4 ${fragName};
  ${getPointTexture(fragName, pointTextures, effectFragName)}
  ${fragName} = vec4(${fragName}.rgb , opacity);
  if(${fragName}.a < 0.5) discard;
  `;

  return {
    transform,
    effectFragName,
    effectAttributes,
    effectRequiredFunctions,
    effectVaryings,
    effectUniforms: mergeUniformConfigs([
      defaultEffectUniforms,
      returnedEffectUniforms,
    ]),
  };
};

const getEffectData = (
  fragName: string,
  pointEffectProps: PointMaterialFragmentEffectProps
) => {
  const { effectProps, effectType } = pointEffectProps;

  switch (effectType) {
    case "MATCAP": {
      const matcap = matcapMaterial(fragName, effectProps);
      return fragmentEffectToEffectData(matcap);
    }
    case "COLOR":
    default:
      return defaultPointMaterial(fragName, pointEffectProps);
  }
};

const defaultPointMaterial = (fragName, pointEffectProps) => {
  const { defaultColor } = pointEffectProps;
  const transformation = `${getPointColor(fragName, defaultColor)}`;
  return fragmentEffectToEffectData({ transformation, fragName });
};
