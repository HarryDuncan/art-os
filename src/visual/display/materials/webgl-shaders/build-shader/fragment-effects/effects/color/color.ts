import { Vector3 } from "three";
import { PROPERTY_VALUE_TYPES } from "../../../buildShader.constants";
import { FRAGMENT_COLOR_NAMES } from "../../fragmentEffects.consts";
import { colorTransformation } from "./colorTransformation";
import { FragmentEffectData } from "../../fragmentEffects.types";

export const colorFunctions = () => [];

export const colorUniforms = () => ({
  defaultUniforms: [],
  customUniforms: [
    {
      name: "uColor",
      type: PROPERTY_VALUE_TYPES.VEC3,
      value: new Vector3(0, 0, 0),
    },
  ],
});

export const colorVaryings = () => [];

export const color = (transformColorName: string): FragmentEffectData => {
  const colorName = FRAGMENT_COLOR_NAMES.COLOR;
  const uniformConfig = colorUniforms();
  const varyingConfig = colorVaryings();
  const transformation = colorTransformation(transformColorName, colorName);
  const requiredFunctions = colorFunctions();
  return {
    requiredFunctions,
    uniformConfig,
    transformation,
    varyingConfig,
    pointName,
  };
};
