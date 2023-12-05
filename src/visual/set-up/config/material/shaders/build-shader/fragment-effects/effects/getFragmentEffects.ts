import { FragmentEffectData } from "../../buildShader.types";
import { FRAGMENT_EFFECT } from "../fragmentEffects.consts";
import { defaultFragmentEffect } from "./defaultFragmentEffect/defaultFragmentEffect";
import { getFragmentMaterial } from "./material/getFragmentMaterial";

export const getFragmentEffects = (
  effect,
  transformColorName
): FragmentEffectData => {
  switch (effect.effectType) {
    case FRAGMENT_EFFECT.COLOR:
    case FRAGMENT_EFFECT.MATERIAL:
      return getFragmentMaterial(transformColorName);
    case FRAGMENT_EFFECT.DEFAULT:
    default:
      return defaultFragmentEffect();
  }
};
