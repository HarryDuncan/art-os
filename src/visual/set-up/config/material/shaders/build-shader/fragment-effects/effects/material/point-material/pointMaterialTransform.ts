import { ShaderPropertyValueTypes } from "../../../../constants";
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
    effectUniforms: returnedEffectUniforms,
  } = getEffectData(fragName, pointEffectProps);

  const transform = `
  float opacity = uOpacity;
  if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
  ${effectTransform}
  ${getPointTexture(fragName, pointTextures)}
  if(${effectFragName}.a < 0.5) discard;
  `;

  return {
    transform,
    effectFragName,
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
      console.log(matcap);
      return defaultPointMaterial(fragName, pointEffectProps);
    }

    case "COLOR":
    default:
      return defaultPointMaterial(fragName, pointEffectProps);
  }
};

const defaultPointMaterial = (fragName, pointEffectProps) => {
  const { defaultColor } = pointEffectProps;
  const effectUniforms = {
    defaultUniforms: [],
    customUniforms: [],
  };
  const effectTransform = `${getPointColor(fragName, defaultColor)}`;
  return { effectTransform, effectUniforms, effectFragName: fragName };
};
