import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import {
  DefaultUniform,
  FragmentEffectData,
  UniformConfig,
} from "../../../buildShader.types";

export const colorFunctions = () => [];

export const opacityUniforms = () => ({
  defaultUniforms: ["uOpacity"] as DefaultUniform[],
  customUniforms: [],
});

export const colorVaryings = () => [];

const opacityTransformation = (
  transformColorName: string,
  currentName: string
) => `
    float opacity = uOpacity;
    vec4 ${transformColorName} = vec4(${currentName}.x, ${currentName}.y, ${currentName}.z, opacity);
`;
export const opacity = (transformColorName: string): FragmentEffectData => {
  const fragmentColorName = FRAGMENT_COLOR_NAMES.OPACITY;
  const uniformConfig = opacityUniforms() as UniformConfig;
  const varyingConfig = colorVaryings();
  const transformation = opacityTransformation(
    fragmentColorName,
    transformColorName
  );
  const requiredFunctions = colorFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragmentColorName,
  };
};
