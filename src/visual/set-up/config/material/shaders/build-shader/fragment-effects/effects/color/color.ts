import { Vector3 } from "three";
import { ShaderPropertyValueTypes } from "../../../buildShader.constants";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import { colorTransformation } from "./colorTransformation";
import { FragmentEffectData, UniformConfig } from "../../../buildShader.types";

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

export const color = (transformColorName: string): FragmentEffectData => {
  const colorName = FRAGMENT_COLOR_NAMES.COLOR;
  const uniformConfig = colorUniforms() as UniformConfig;
  const varyingConfig = colorVaryings();
  const transformation = colorTransformation(transformColorName, colorName);
  const requiredFunctions = colorFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    attributeConfig: [],
    fragmentColorName: "pointName",
  };
};
