import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../buildShader.consts";
import {
  DEFAULT_FRAG_COLOR,
  FRAGMENT_COLOR_NAMES,
} from "../../fragmentEffects.consts";
import { colorTransformation } from "./colorTransformation";
import {
  ColorEffectProps,
  FragmentEffectData,
  UniformConfig,
} from "../../../buildShader.types";

export const colorFunctions = () => [];

export const colorUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [
    {
      id: "uColor",
      valueType: ShaderPropertyValueTypes.VEC3,
      value: new Vector3(0, 0, 0),
    },
  ],
});

export const colorVaryings = () => [];

export const color = (
  _previousFragName: string,
  effectProps: Partial<ColorEffectProps>
): FragmentEffectData => {
  const formattedEffectProps = formatEffectProps(effectProps);
  const fragName = FRAGMENT_COLOR_NAMES.COLOR;
  const uniformConfig = colorUniforms() as UniformConfig;
  const varyingConfig = colorVaryings();
  const transformation = colorTransformation(fragName, formattedEffectProps);
  const requiredFunctions = colorFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragName,
  };
};
const formatEffectProps = (parsedEffectProps: Partial<ColorEffectProps>) => {
  return { color: DEFAULT_FRAG_COLOR, ...parsedEffectProps };
};
