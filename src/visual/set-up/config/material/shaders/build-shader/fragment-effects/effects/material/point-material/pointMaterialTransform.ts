import { ShaderPropertyValueTypes } from "../../../../constants";
import {
  PointMaterialFragmentEffectProps,
  PointTexture,
} from "../../../../types";
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
  const { defaultColor, pointTextures } = pointEffectProps;
  const transformation = `
  float opacity = uOpacity;
  if(vPointDisplay == 0.0 ){
      opacity = 0.0;
  }
  ${getPointColor(fragName, defaultColor)}       
  ${getPointTexture(fragName, pointTextures)}
  if(${fragName}.a < 0.5) discard;
  `;
  const effectUniforms = {
    defaultUniforms: [],
    customUniforms: setUpTextureUniforms(pointTextures),
  };
  return { transformation, effectUniforms };
};
