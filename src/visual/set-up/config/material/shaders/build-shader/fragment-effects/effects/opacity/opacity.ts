import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import {
  FragmentEffectData,
  OpacityEffectProps,
} from "../../../buildShader.types";
import {
  OPACITY_UNIFORMS,
  OPACITY_VARYINGS,
  OPACITY_FUNCTIONS,
} from "./opacity.consts";

const opacityTransformation = (
  transformColorName: string,
  currentName: string
) => `
    float opacity = uOpacity;
    vec4 ${transformColorName} = vec4(${currentName}.x, ${currentName}.y, ${currentName}.z, opacity);
`;
export const opacity = (
  transformColorName: string,
  effectProps: Partial<OpacityEffectProps>
): FragmentEffectData => {
  const fragmentColorName = FRAGMENT_COLOR_NAMES.OPACITY;
  const uniformConfig = OPACITY_UNIFORMS;
  const varyingConfig = OPACITY_VARYINGS;
  const transformation = opacityTransformation(
    fragmentColorName,
    transformColorName
  );
  const requiredFunctions = OPACITY_FUNCTIONS;
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragmentColorName,
  };
};
